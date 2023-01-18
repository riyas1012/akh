<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;
use App\Mail\AdminApplicationMail;
use App\Mail\AdminPasswordMail;
use App\Models\Admin;
use App\Models\CompanyActivityType;
use App\Models\Configuration;
use App\Models\FbOfferingType;
use App\Models\FBTypes;
use App\Models\UnitTypes;
use App\Models\User;
use App\Models\UserApplication;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $rules = array(
            'user_name' => 'required',
            'password' => 'required',
        );

        $validator = Validator::make(
            $request->all(),
            $rules
        );
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }

        $admin = Admin::where('user_name', $request->get('user_name'))->first();
        if (!$admin) {
            return array('status' => false, 'message' => 'Not Registered Admin');
        }
        if (Hash::check($request->get('password'), $admin->password)) {
            if ($admin->status == 0) {
                return array('status' => false, 'message' => 'Your Account is inactived. Please contact Super Admin');
            }
            $token = $this->generateRandomKey(32);
            $admin->token = $token;
            $admin->save();

            return array('status' => true, 'admin' => $admin);
        } else {
            return array('status' => false, 'message' => trans('error.invalid_password'));
        }
    }

    public function generateRandomKey($length = 32)
    {
        return substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
    }

    public function logout(Request $request)
    {
        $admin = Admin::find($request->attributes->get('admin_id'));
        if (!$admin) {
            return array('status' => false, 'message' => 'Invalid admin details');
        }
        Admin::where('id', $request->attributes->get('admin_id'))->update(array(
            'token' => null,
        ));
        return array('status' => true);
    }

    public function getdasboardDetails(Request $request)
    {
        $userCollection = collect(User::get());
        $totalUser = $userCollection->count();
        $activeUserCount = $userCollection->where('is_email_verified', 1)->count();
        $inactiveUserCount = $userCollection->where('is_email_verified', 0)->count();

        $userApplicationCollection = collect(UserApplication::get());
        $submittedCount = $userApplicationCollection->where('status', 'Submitted')->count();
        $underReviewCount = $userApplicationCollection->where('status', 'Under Review')->count();
        $shortlistedCount = $userApplicationCollection->where('status', 'Shortlisted')->count();
        $rejectedCount = $userApplicationCollection->where('status', 'Rejected')->count();

        return array(
            'total_user' => $totalUser,
            'active_user' => $activeUserCount,
            'inactive_user' => $inactiveUserCount,
            'submitted_count' => $submittedCount,
            'under_review_count' => $underReviewCount,
            'shortlisted_count' => $shortlistedCount,
            'rejected_count' => $rejectedCount,
        );
    }

    public function operatorsStore(Request $request)
    {
        $rules = array(
            'user_name' => 'required|unique:admins',
            'email' => 'required|email|unique:admins',
            'full_name' => 'required',
            'contact_number' => 'required',
            'operator_admin_type' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }
        DB::beginTransaction();
        try {
            $passwordEmailToken = $this->generateRandomKey(20);
            $admin = new Admin();
            $admin->user_name = $request->get('user_name');
            $admin->name = $request->get('full_name');
            $admin->email = $request->get('email');
            $admin->contact_number = $request->get('contact_number');
            $admin->status = 0;
            $admin->admin_type = $request->get('operator_admin_type');
            $admin->password_email_token = $passwordEmailToken;
            $admin->created_by = $request->attributes->get('admin_id');
            $admin->save();
            $details = array(
                'user_name' => $admin->user_name,
                'email' => $admin->email,
                'password_email_token' => $passwordEmailToken,
            );
            Log::info("Email:" . $admin->email);
            if (env('SEND_MAIL_QUEUE')) {
                Log::info("Email Queue:");
                $uniqueId = uniqid();
                $queueDelay = 0;
                $resetMailJob = (new SendEmailJob($details, 'admin_register_password', $uniqueId))->delay($queueDelay)->onQueue('default');
                dispatch($resetMailJob);
            } else {
                Mail::to($admin->email)
                    ->send(new AdminPasswordMail($details));
            }
            DB::commit();
            return array('status' => true);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info("Create Error:" . json_encode($e->getMessage()));
            return array('status' => false, 'message' => 'Something went wrong...');
        }
    }

    public function createPassword(Request $request, $passwordToken)
    {
        $admin = Admin::where('password_email_token', $passwordToken)->first();
        if (!$admin) {
            return array('status' => false, 'message' => 'invalid creaet password link.');
        }
        if ($admin->is_password_set == 1) {
            return array('status' => false, 'message' => 'Password is already created.');
        }
        return array('status' => true, 'email' => $admin->email);
    }

    public function updatePassword(Request $request, $passwordToken)
    {
        $rules = array(
            'password' => 'required',
            'password_confirmation' => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100', 'redirect' => 'back');
        }
        $admin = Admin::where('password_email_token', $passwordToken)->first();
        if (!$admin) {
            return array('status' => false, 'message' => 'invalid creaet password link.', 'redirect' => 'index');
        }
        if ($admin->is_password_set == 1) {
            return array('status' => false, 'message' => 'Password is already created.', 'redirect' => 'index');
        }
        Admin::where('password_email_token', $passwordToken)->update(array(
            'is_password_set' => 1,
            'password' => Hash::make($request->password),
            'status' => 1,
        ));
        return array('status' => true);
    }

    public function operatorsEdit(Request $request, $operatorId)
    {
        $operatorId = Crypt::decrypt($operatorId);
        $admin = Admin::where('id', $operatorId)->first();
        if (!$admin) {
            return array('status' => false, 'message' => 'invalid creaet password link.', 'redirect' => 'index');
        }
        return array('status' => true, 'admin' => $admin);
    }

    public function operatorsUpdate(Request $request, $operatorId)
    {
        $operatorId = Crypt::decrypt($operatorId);
        $admin = Admin::where('id', $operatorId)->first();
        if (!$admin) {
            return array('status' => false, 'message' => 'invalid creaet password link.', 'redirect' => 'index');
        }
        $rules = array(
            'user_name' => 'required|unique:admins,user_name,' . $operatorId,
            'email' => 'required|email|unique:admins,email,' . $operatorId,
            'full_name' => 'required',
            'contact_number' => 'required',
            'operator_admin_type' => 'required',
            'status' => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }
        $admin->user_name = $request->get('user_name');
        $admin->name = $request->get('full_name');
        $admin->email = $request->get('email');
        $admin->contact_number = $request->get('contact_number');
        $admin->status = $request->get('status');
        $admin->admin_type = $request->get('operator_admin_type');
        $admin->save();

        return array('status' => true);
    }

    public function allApplicationCollection(Request $request)
    {
        return collect(UserApplication::get());
        // return UserApplication::get();
    }

    public function applicationDetailsEdit(Request $request, $applicationNumber)
    {
        $application = UserApplication::where('application_number', $applicationNumber)->first();
        if (!$application) {
            return array('status' => false, 'message' => 'invalid application details', 'error_code' => '100', 'redirect' => 'index');
        }
        $rules = array(
            'status' => 'required',
        );
        if ($request->get('status') == 'Rejected') {
            $rules['rejected_en'] = 'required';
            $rules['rejected_ar'] = 'required';
        }
        if ($request->get('status') == 'Need more information') {
            $rules['need_more_info_ar'] = 'required';
            $rules['need_more_info_en'] = 'required';
        }
        if ($request->get('status') == 'Approved') {
            $rules['approved_message_en'] = 'required';
            $rules['approved_message_ar'] = 'required';
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100', 'redirect' => 'back');
        }

        DB::beginTransaction();
        try {
            $applicationStatus = $application->status;
            $applicationScore = $application->score;
            if ($request->hasFile('company_profile')) {
                if (Storage::exists($application->company_profile_doc_path)) {
                    Storage::delete($application->company_profile_doc_path);
                }
                $companyProfilePath = 'company_profile';
                $fileExt = $request->file('company_profile')->getClientOriginalExtension();
                $companyProfileFileName = 'CP_' . Carbon::now()->timestamp . '.' . $fileExt;
                $companyProfileFilePath = $request->file('company_profile')->storeAs($companyProfilePath, $companyProfileFileName, 'user_document');
                $application->commpany_profile_doc_name = $companyProfileFileName;
                $application->company_profile_doc_path = $companyProfileFilePath;
            }

            if ($request->hasFile('ktcc_image')) {
                if (Storage::exists($application->ktcc_image_path)) {
                    Storage::delete($application->ktcc_image_path);
                }
                $ktccImagePath = 'ktcc_image';
                $fileExt = $request->file('ktcc_image')->getClientOriginalExtension();
                $ktccImageFileName = Carbon::now()->timestamp . '.' . $fileExt;
                $ktccImageFilePath = $request->file('ktcc_image')->storeAs($ktccImagePath, $ktccImageFileName, 'user_document');
                $application->ktcc_image_name = $ktccImageFileName;
                $application->ktcc_image_path = $ktccImageFilePath;
            }

            if ($request->hasFile('commercial_document')) {
                if (Storage::exists($application->commercial_documnet_path)) {
                    Storage::delete($application->commercial_documnet_path);
                }
                $commercialDocumentPath = 'commercial_document';
                $fileExt = $request->file('commercial_document')->getClientOriginalExtension();
                $commercialDocumentFileName = 'COM_' . Carbon::now()->timestamp . '.' . $fileExt;
                $commercialDocumentFilePath = $request->file('commercial_document')->storeAs($commercialDocumentPath, $commercialDocumentFileName, 'user_document');
                $application->commercial_document_name = $commercialDocumentFileName;
                $application->commercial_documnet_path = $commercialDocumentFilePath;
            }

            if ($request->hasFile('trade_license')) {
                if (Storage::exists($application->trade_licence_doc_path)) {
                    Storage::delete($application->trade_licence_doc_path);
                }
                $tradeLicensePath = 'trade_license';
                $fileExt = $request->file('trade_license')->getClientOriginalExtension();
                $tradeLicenseFileName = 'TL_' . Carbon::now()->timestamp . '.' . $fileExt;
                $tradeLicenseFilePath = $request->file('trade_license')->storeAs($tradeLicensePath, $tradeLicenseFileName, 'user_document');
                $application->trade_licence_doc_name = $tradeLicenseFileName;
                $application->trade_licence_doc_path = $tradeLicenseFilePath;
            }

            if ($request->hasFile('company_computer_card')) {
                if (Storage::exists($application->company_card_doc_path)) {
                    Storage::delete($application->company_card_doc_path);
                }
                $companyCardPath = 'company_card';
                $fileExt = $request->file('company_computer_card')->getClientOriginalExtension();
                $companyCardFileName = 'CC_' . Carbon::now()->timestamp . '.' . $fileExt;
                $companyCardFilePath = $request->file('company_computer_card')->storeAs($companyCardPath, $companyCardFileName, 'user_document');
                $application->company_card_doc_name = $companyCardFileName;
                $application->company_card_doc_path = $companyCardFilePath;
            }

            if ($request->hasFile('owner_partners_qid')) {
                if (Storage::exists($application->qid_path)) {
                    Storage::delete($application->qid_path);
                }
                $qidPath = 'qid';
                $fileExt = $request->file('owner_partners_qid')->getClientOriginalExtension();
                $qidFileName = 'QID_' . Carbon::now()->timestamp . '.' . $fileExt;
                $qidFilePath = $request->file('owner_partners_qid')->storeAs($qidPath, $qidFileName, 'user_document');
                $application->qid_name = $qidFileName;
                $application->qid_path = $qidFilePath;
            }
            $application->status = $request->get('status');
            if ($request->get('status') == 'Rejected') {
                $application->mail_en = $request->get('rejected_en');
                $application->mail_ar = $request->get('rejected_ar');
            }
            if ($request->get('status') == 'Need more information') {
                $application->mail_en = $request->get('need_more_info_en');
                $application->mail_ar = $request->get('need_more_info_ar');
            }
            if ($request->get('status') == 'Approved') {
                $application->mail_en = $request->get('approved_message_en');
                $application->mail_ar = $request->get('approved_message_ar');
            }
            $application->score = $request->get('score');
            if (($applicationStatus != $request->get('status')) || ($applicationScore != $request->get('score'))) {
                $application->updated_admin_id = $request->attributes->get('admin_id');
            }
            $application->save();
            Log::info("Status:" . $request->get('status'));
            if ($request->get('status') == 'Rejected' || $request->get('status') == 'Approved' || $request->get('status') == 'Need more information') {
                Log::info("Status:" . $request->get('status'));
                $this->sendApplicantMail($application->id, $request->get('status'));
            }
            DB::commit();
            return array('status' => true);
        } catch (Exception $e) {
            Log::info("application update error: " . json_encode($e->getMessage()));
            DB::rollBack();
            return array('status' => false, 'message' => 'something went wrong!!!!!', 'redirect' => 'back');
        }
    }

    public function sendApplicantMail($applicationId, $status)
    {
        $application = UserApplication::where('id', $applicationId)->first();
        $details = array(
            'status' => $application->status,
            'email' => $application->users->email,
            'message_en' => $application->mail_en,
            'message_ar' => $application->mail_ar,
            'application_number' => $application->application_number,
            'concept_name' => $application->concept_name,
        );

        if (env('SEND_MAIL_QUEUE')) {
            $uniqueId = uniqid();
            $queueDelay = 0;
            $resetMailJob = (new SendEmailJob($details, 'admin_application_mail', $uniqueId))->delay($queueDelay)->onQueue('default');
            dispatch($resetMailJob);
        } else {
            Log::info("Status mail:" . $status);
            Log::info("applicationusermail:" . $application->users->email);
            Mail::to($application->users->email)
                ->send(new AdminApplicationMail($details));
        }
    }

    public function getApplicationPredefinedValues()
    {
        $companyActivityType = CompanyActivityType::where('status', 1)->where('type', 'FB')->get();
        $unitTypes = UnitTypes::where('status', 1)->get();
        $fbTypes = FBTypes::where('status', 1)->get();
        $fbOfferTypes = FbOfferingType::where('status', 1)->get();

        return array(
            'company_activity_type' => $companyActivityType,
            'fb_types' => $fbTypes,
            'unit_types' => $unitTypes,
            'fb_offer_types' => $fbOfferTypes,
        );
    }

    public function applicationSearch(Request $request)
    {
        // $searchapplications = $this->allApplicationCollection($request);
        $searchapplications = new UserApplication();
        $applicationCollection = new Collection;
        if ($request->has('status') && $request->get('status') != "") {
            $searchapplications = $searchapplications->where('status', $request->get('status'));
        }
        if ($request->has('unit_type_id') && $request->get('unit_type_id') != "") {
            $searchapplications = $searchapplications->where('unit_type_id', $request->get('unit_type_id'));
        }
        if (($request->has('score_condition') && $request->get('score_condition') != "") && ($request->has('score') && $request->get('score') != "")) {
            if ($request->get('score_condition') == 'lessthan') {
                $searchapplications = $searchapplications->where('score', '<', $request->get('score'));
            } elseif ($request->get('score_condition') == 'greaterthan') {
                $searchapplications = $searchapplications->where('score', '>', $request->get('score'));
            } elseif ($request->get('score_condition') == 'inbetween' && ($request->has('score_inbetween') && $request->get('score_inbetween') != "")) {
                $searchapplications = $searchapplications->whereBetween('score', [$request->get('score'), $request->get('score_inbetween')]);
            } elseif ($request->get('score_condition') == 'equal') {
                $searchapplications = $searchapplications->where('score', $request->get('score'));
            }
        }

        $searchapplications = $searchapplications->get();
        $output = array();
        $dataArray = array();
        foreach ($searchapplications as $application) {
            $companyActivityTag = 0;
            $fbCousineTag = 0;
            $fbOfferingType = 0;
            if ($request->has('company_activity_type_id') && $request->get('company_activity_type_id') != "") {
                if ($application->other_options->where('option_name', 'company_activity_type')->where('option_id', $request->get('company_activity_type_id'))->count() != 0) {
                    $companyActivityTag = 1;
                } else {
                    $companyActivityTag = 2;
                }
            }
            if ($request->has('fb_type_id') && $request->get('fb_type_id') != "") {
                if ($application->other_options->where('option_name', 'fb_type')->where('option_id', $request->get('fb_type_id'))->count() != 0) {
                    $fbCousineTag = 1;
                } else {
                    $fbCousineTag = 2;
                }
            }
            if ($request->has('fb_offer_type_id') && $request->get('fb_offer_type_id') != "") {
                if ($application->other_options->where('option_name', 'fb_offer_type')->where('option_id', $request->get('fb_offer_type_id'))->count() != 0) {
                    $fbOfferingType = 1;
                } else {
                    $fbOfferingType = 2;
                }
            }
            $company_activity_array = [];
            $fb_offer_type_array = [];
            $fb_type_array = [];
            foreach ($application->other_options->where('option_name', 'company_activity_type') as $item) {
                array_push($company_activity_array, $item->company_activity_types->english);
            }
            $company_activity_name = implode(',', $company_activity_array);
            foreach ($application->other_options->where('option_name', 'fb_offer_type') as $item) {
                array_push($fb_offer_type_array, $item->fb_offer_types->english);
            }
            $fb_offer_type_name = implode(',', $fb_offer_type_array);

            foreach ($application->other_options->where('option_name', 'fb_type') as $item) {

                array_push($fb_type_array, $item->fb_types->english);

            }

            $fb_type_name = implode(',', $fb_type_array);
            $action = '<a
            href="' . route("admin.applications.details", ["application_number" => $application->application_number]) . '">
            <i class="fa fa-eye"></i>
        </a>';
            if ($application->existing_branche_id != null) {
                $existingBranch = $application->existing_branches->english;
            } else {
                $existingBranch = "-";
            }

            if ($application->other_type != null) {
                $fbOfferOther = $application->other_type;
            } else {
                $fbOfferOther = "-";
            }

            if ($application->other_fb_cousine != null) {
                $fbCusineOther = $application->other_fb_cousine;
            } else {
                $fbCusineOther = "-";
            }

            if ($application->ktcc_image_path != null) {
                /*$ktccImagePath = '<a
                href="' . route('download', ['type' => 'ktccimage', 'unique_id' => $application->application_number]) . '">
                Download Document
                </a>';*/
                $ktccImagePath = '<a
                href="' . config('global.user_url') . '/downoad-document/ktccimage' . '/' . $application->application_number . '">
                ' . config('global.user_url') . '/downoad-document/ktccimage' . '/' . $application->application_number . '
            </a>';

            } else {
                $ktccImagePath = "-";
            }

            if ($application->kitchen_footprint_area_id != null) {
                $kitchenFootprintArea = $application->kitchen_footprint->english;
            } else {
                $kitchenFootprintArea = "-";
            }

            if ($application->updated_admin_id != null) {
                $adminName = $application->admins->name;
            } else {
                $adminName = "-";
            }

            /*$companyprofile = '<a
            href="' . route('download', ['type' => 'companyprofile', 'unique_id' => $application->application_number]) . '">
            Download Document
            </a>';

            $commercial = '<a
            href="' . route('download', ['type' => 'commercial', 'unique_id' => $application->application_number]) . '">
            Download Document
            </a>';

            $trade = '<a
            href="' . route('download', ['type' => 'trade', 'unique_id' => $application->application_number]) . '">
            Download Document
            </a>';

            $computercard = '<a
            href="' . route('download', ['type' => 'computercard', 'unique_id' => $application->application_number]) . '">
            Download Document
            </a>';

            $qid = '<a
            href="' . route('download', ['type' => 'qid', 'unique_id' => $application->application_number]) . '">
            Download Document
            </a>';*/

            $companyprofile = '<a
                href="' . config('global.user_url') . '/downoad-document/companyprofile' . '/' . $application->application_number . '">
                ' . config('global.user_url') . '/downoad-document/companyprofile' . '/' . $application->application_number . '
            </a>';

            $commercial = '<a
                href="' . config('global.user_url') . '/downoad-document/commercial' . '/' . $application->application_number . '">
                ' . config('global.user_url') . '/downoad-document/commercial' . '/' . $application->application_number . '
            </a>';

            $trade = '<a
                href="' . config('global.user_url') . '/downoad-document/trade' . '/' . $application->application_number . '">
                ' . config('global.user_url') . '/downoad-document/trade' . '/' . $application->application_number . '
            </a>';

            $computercard = '<a
                href="' . config('global.user_url') . '/downoad-document/computercard' . '/' . $application->application_number . '">
                ' . config('global.user_url') . '/downoad-document/computercard' . '/' . $application->application_number . '
            </a>';

            $qid = '<a
                href="' . config('global.user_url') . '/downoad-document/qid' . '/' . $application->application_number . '">
                ' . config('global.user_url') . '/downoad-document/qid' . '/' . $application->application_number . '
            </a>';

            if (($request->get('company_activity_type_id') != "") || ($request->get('fb_type_id') != "") || ($request->get('fb_offer_type_id') != "")) {
                if ($companyActivityTag != 2 && $fbCousineTag != 2 && $fbOfferingType != 2) {
                    $applicationCollection->push([
                        'created_at' => Carbon::parse($application->created_at)->format('d-m-y'),
                        'application_number' => $application->application_number,
                        'concept_name' => $application->concept_name,
                        'applicant_name' => $application->first_name . ' ' . $application->surname,
                        'year_of_experience' => $application->year_of_experience->english,
                        'company_activity_name' => $company_activity_name,
                        'existing_branch' => $existingBranch,
                        'fb_offer_type_name' => $fb_offer_type_name,
                        'fb_offer_other' => $fbOfferOther,
                        'phone_number' => $application->users->phone_number,
                        'email' => $application->users->email,
                        'fb_type_name' => $fb_type_name,
                        'fb_cusine_other' => $fbCusineOther,
                        'unit_type' => $application->unit_type->english,
                        'description' => $application->description,
                        'number_of_employess' => $application->number_of_employess->english,
                        'ktcc' => $application->ktcc->english,
                        'specify_ktcc' => $application->specify_ktcc,
                        'ktcc_image_path' => $ktccImagePath,
                        'central_kitchen' => $application->central_kitchen->english,
                        'kitchen_footprint_area' => $kitchenFootprintArea,
                        'company_profile' => $companyprofile,
                        'commercial' => $commercial,
                        'trade' => $trade,
                        'computercard' => $computercard,
                        'qid' => $qid,
                        'admin_name' => $adminName,
                        'score' => $application->score,
                        'status' => $application->status,
                        'action' => $action,
                    ]);
                    // $data = array(
                    //     Carbon::parse($application->created_at)->format('d-m-y'),
                    //     $application->application_number,
                    //     $application->concept_name,
                    //     $application->first_name . ' ' . $application->surname,
                    //     $application->year_of_experience->english,
                    //     $company_activity_name,
                    //     $existingBranch,
                    //     $fb_offer_type_name,
                    //     $fbOfferOther,
                    //     $application->users->phone_number,
                    //     $application->users->email,
                    //     $fb_type_name,
                    //     $fbCusineOther,
                    //     $application->unit_type->english,
                    //     $application->description,
                    //     $application->number_of_employess->english,
                    //     $application->ktcc->english,
                    //     $application->specify_ktcc,
                    //     $ktccImagePath,
                    //     $application->central_kitchen->english,
                    //     $kitchenFootprintArea,
                    //     $companyprofile,
                    //     $commercial,
                    //     $trade,
                    //     $computercard,
                    //     $qid,
                    //     $adminName,
                    //     $application->score,
                    //     $application->status,
                    //     $action,
                    // );
                    // array_push($dataArray, $data);
                }
            } else {
                $applicationCollection->push([
                    'created_at' => Carbon::parse($application->created_at)->format('d-m-y'),
                    'application_number' => $application->application_number,
                    'concept_name' => $application->concept_name,
                    'applicant_name' => $application->first_name . ' ' . $application->surname,
                    'year_of_experience' => $application->year_of_experience->english,
                    'company_activity_name' => $company_activity_name,
                    'existing_branch' => $existingBranch,
                    'fb_offer_type_name' => $fb_offer_type_name,
                    'fb_offer_other' => $fbOfferOther,
                    'phone_number' => $application->users->phone_number,
                    'email' => $application->users->email,
                    'fb_type_name' => $fb_type_name,
                    'fb_cusine_other' => $fbCusineOther,
                    'unit_type' => $application->unit_type->english,
                    'description' => $application->description,
                    'number_of_employess' => $application->number_of_employess->english,
                    'ktcc' => $application->ktcc->english,
                    'specify_ktcc' => $application->specify_ktcc,
                    'ktcc_image_path' => $ktccImagePath,
                    'central_kitchen' => $application->central_kitchen->english,
                    'kitchen_footprint_area' => $kitchenFootprintArea,
                    'company_profile' => $companyprofile,
                    'commercial' => $commercial,
                    'trade' => $trade,
                    'computercard' => $computercard,
                    'qid' => $qid,
                    'admin_name' => $adminName,
                    'score' => $application->score,
                    'status' => $application->status,
                    'action' => $action,
                ]);
                // $data = array(
                //     Carbon::parse($application->created_at)->format('d-m-y'),
                //     $application->application_number,
                //     $application->concept_name,
                //     $application->first_name . ' ' . $application->surname,
                //     $application->year_of_experience->english,
                //     $company_activity_name,
                //     $existingBranch,
                //     $fb_offer_type_name,
                //     $fbOfferOther,
                //     $application->users->phone_number,
                //     $application->users->email,
                //     $fb_type_name,
                //     $fbCusineOther,
                //     $application->unit_type->english,
                //     $application->description,
                //     $application->number_of_employess->english,
                //     $application->ktcc->english,
                //     $application->specify_ktcc,
                //     $ktccImagePath,
                //     $application->central_kitchen->english,
                //     $kitchenFootprintArea,
                //     $companyprofile,
                //     $commercial,
                //     $trade,
                //     $computercard,
                //     $qid,
                //     $adminName,
                //     $application->score,
                //     $application->status,
                //     $action,
                // );
                // array_push($dataArray, $data);
            }
        }
        // $output['data'] = $dataArray;
        return $applicationCollection;
    }

    public function updateConfiguration(Request $request)
    {
        Configuration::where('name', 'USER_APPLICATION_SITE')->update(array(
            'value' => $request->get('application_site_status'),
        ));

        return array('status' => true);
    }
}
