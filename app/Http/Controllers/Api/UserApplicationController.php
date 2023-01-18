<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;
use App\Mail\FBApplicationMail;
use App\Mail\UserApplicationMail;
use App\Models\CentralKitchen;
use App\Models\CompanyActivityType;
use App\Models\Configuration;
use App\Models\ExistingBranches;
use App\Models\FbKtcc;
use App\Models\FbOfferingType;
use App\Models\FBTypes;
use App\Models\KitchenFootprintArea;
use App\Models\NumberOfEmployees;
use App\Models\OtherOptions;
use App\Models\RetailType;
use App\Models\UnitTypes;
use App\Models\User;
use App\Models\UserApplication;
use App\Models\YearsOfExperience;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserApplicationController extends Controller
{
    public function getApplicationNeededDetails(Request $request)
    {
        $fbTypes = array();
        $fbOfferTypes = array();
        $retailTypes = array();
        $applicationNumber = $this->getUniqueApplicationNumber();
        $user = User::find($request->attributes->get('user_id'));
        $yearsOfExperiences = YearsOfExperience::where('status', 1)->get();
        $companyActivityType = CompanyActivityType::where('status', 1)->where('type', $request->attributes->get('user_type'))->get();
        $existingBranches = ExistingBranches::where('status', 1)->get();
        $unitTypes = UnitTypes::where('status', 1)->get();
        $numberOfEmployees = NumberOfEmployees::where('status', 1)->get();
        $ktcc = FbKtcc::where('status', 1)->where('type', $request->attributes->get('user_type'))->get();
        $centralKitchen = CentralKitchen::where('status', 1)->get();
        $kitchenFootprint = KitchenFootprintArea::where('status', 1)->get();
        if ($request->attributes->get('user_type') == 'FB') {
            $fbTypes = FBTypes::where('status', 1)->get();
            $fbOfferTypes = FbOfferingType::where('status', 1)->get();
        } else {
            $retailTypes = RetailType::where('status', 1)->get();
        }

        return array(
            'application_number' => $applicationNumber,
            'user' => $user,
            'years_of_experiences' => $yearsOfExperiences,
            'company_activity_type' => $companyActivityType,
            'existing_branches' => $existingBranches,
            'fb_types' => $fbTypes,
            'unit_types' => $unitTypes,
            'no_of_employees' => $numberOfEmployees,
            'ktcc' => $ktcc,
            'central_kitchen' => $centralKitchen,
            'kitchen_footprint' => $kitchenFootprint,
            'fb_offer_types' => $fbOfferTypes,
            'retail_types' => $retailTypes,
        );
    }

    public function getUniqueApplicationNumber()
    {
        $applicationNumber = $applicationNumber = 'F&B-' . substr(str_shuffle("0123456789"), 0, 5);
        if (UserApplication::where('application_number', $applicationNumber)->count() == 0) {
            return $applicationNumber;
        } else {
            return $this->getUniqueApplicationNumber();
        }
    }

    public function saveApplication(Request $request, $applicationNumber)
    {
        $rules = array(
            'first_name' => 'required',
            'last_name' => 'required',
            // 'email' => 'required|email',
            // 'phone_number' => 'required',
            'year_of_experience_id' => 'required',
            'company_activity_type_id' => 'required',
            'concept_name' => 'required',
            'unit_type_id' => 'required',
            'description' => 'required',
            'number_of_employee_id' => 'required',
            'ktcc_id' => 'required',
            'central_kitchen_id' => 'required',
            'company_profile' => 'required|mimes:jpg,jpeg,png,pdf,doc,docx|max:3000',
            'owner_partners_qid' => 'required|mimes:jpg,jpeg,png,pdf,doc,docx|max:3000',
            'declaration' => 'required',
        );
        if ($request->attributes->get('user_type') == 'FB') {
            $rules['fb_type_id'] = 'required';
            $rules['fb_offer_type_id'] = 'required';
        } else {
            $rules['retail_type_id'] = 'required';
        }

        if ($request->get('company_activity_type_id') == 6) {
            $rules['home_business_license'] = 'required|mimes:jpg,jpeg,png,pdf,doc,docx|max:3000';
        } elseif ($request->get('company_activity_type_id') != 6 && $request->get('company_activity_type_id') != "") {
            $rules['commercial_document'] = 'required|mimes:jpg,jpeg,png,pdf,doc,docx|max:3000';
            $rules['trade_license'] = 'required|mimes:jpg,jpeg,png,pdf,doc,docx|max:3000';
            $rules['company_computer_card'] = 'required|mimes:jpg,jpeg,png,pdf,doc,docx|max:3000';
            $rules['existing_branche_id'] = 'required';
        }

        if ($request->get('ktcc_id') != 1 && $request->get('ktcc_id') != "") {
            $rules['specify_ktcc'] = 'required';
            $rules['ktcc_image'] = 'required|mimes:jpg,jpeg,png,pdf,doc,docx|max:3000';
        }

        if ($request->get('central_kitchen_id') == 1) {
            $rules['kitchen_footprint_area_id'] = 'required';
        }

        if (in_array(19,$request->get('fb_type_id'))) {
            $rules['other_cuisine_type'] = 'required';
        }

        // if ($request->get('fb_offer_type_id') == 12 || $request->get('retail_type_id') == 13) {
        if (in_array(12,$request->get('fb_offer_type_id'))) {
            $rules['other_type'] = 'required';
        }

        $validator = Validator::make(
            $request->all(),
            $rules
        );
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }
        DB::beginTransaction();
        try {
            $userApplication = new UserApplication();
            $userApplication->user_id = $request->attributes->get('user_id');
            $userApplication->first_name = $request->get('first_name');
            $userApplication->surname = $request->get('last_name');
            // $userApplication->email = $request->get('email');
            // $userApplication->phone_number = $request->get('phone_number');
            $userApplication->application_number = $applicationNumber;
            $userApplication->year_of_experience_id = $request->get('year_of_experience_id');
            // $userApplication->company_activity_type_id = $request->get('company_activity_type_id');
            // $userApplication->fb_type_id = $request->get('fb_type_id');
            // $userApplication->fb_offer_type_id = $request->get('fb_offer_type_id');
            $userApplication->concept_name = $request->get('concept_name');
            $userApplication->unit_type_id = $request->get('unit_type_id');
            $userApplication->description = $request->get('description');
            $userApplication->number_of_employee_id = $request->get('number_of_employee_id');
            $userApplication->ktcc_id = $request->get('ktcc_id');
            $userApplication->central_kitchen_id = $request->get('central_kitchen_id');
            if ($request->get('company_activity_type_id') == 6) {
                $homeLicensePath = 'home_license';
                $fileExt = $request->file('home_business_license')->getClientOriginalExtension();
                $homeLicenseFileName = 'HBL_'.Carbon::now()->timestamp . '.' . $fileExt;
                $homeLicenseFilePath = $request->file('home_business_license')->storeAs($homeLicensePath, $homeLicenseFileName);
                $userApplication->home_business_license_name = $homeLicenseFileName;
                $userApplication->home_business_license_path = $homeLicenseFilePath;

            } elseif ($request->get('company_activity_type_id') != 6 && $request->get('company_activity_type_id') != "") {
                $userApplication->existing_branche_id = $request->get('existing_branche_id');

                $commercialDocumentPath = 'commercial_document';
                $fileExt = $request->file('commercial_document')->getClientOriginalExtension();
                $commercialDocumentFileName = 'COM_'. Carbon::now()->timestamp . '.' . $fileExt;
                $commercialDocumentFilePath = $request->file('commercial_document')->storeAs($commercialDocumentPath, $commercialDocumentFileName);
                $userApplication->commercial_document_name = $commercialDocumentFileName;
                $userApplication->commercial_documnet_path = $commercialDocumentFilePath;

                $tradeLicensePath = 'trade_license';
                $fileExt = $request->file('trade_license')->getClientOriginalExtension();
                $tradeLicenseFileName = 'TL_'.Carbon::now()->timestamp . '.' . $fileExt;
                $tradeLicenseFilePath = $request->file('trade_license')->storeAs($tradeLicensePath, $tradeLicenseFileName);
                $userApplication->trade_licence_doc_name = $tradeLicenseFileName;
                $userApplication->trade_licence_doc_path = $tradeLicenseFilePath;

                $companyCardPath = 'company_card';
                $fileExt = $request->file('company_computer_card')->getClientOriginalExtension();
                $companyCardFileName = 'CC_'.Carbon::now()->timestamp . '.' . $fileExt;
                $companyCardFilePath = $request->file('company_computer_card')->storeAs($companyCardPath, $companyCardFileName);
                $userApplication->company_card_doc_name = $companyCardFileName;
                $userApplication->company_card_doc_path = $companyCardFilePath;
            }

            if ($request->get('ktcc_id') != 1 && $request->get('ktcc_id') != "") {
                $userApplication->specify_ktcc = $request->get('specify_ktcc');

                $ktccImagePath = 'ktcc_image';
                $fileExt = $request->file('ktcc_image')->getClientOriginalExtension();
                $ktccImageFileName = Carbon::now()->timestamp . '.' . $fileExt;
                $ktccImageFilePath = $request->file('ktcc_image')->storeAs($ktccImagePath, $ktccImageFileName);
                $userApplication->ktcc_image_name = $ktccImageFileName;
                $userApplication->ktcc_image_path = $ktccImageFilePath;
            }
            if (in_array(19,$request->get('fb_type_id'))) {
                $userApplication->other_fb_cousine = $request->get('other_cuisine_type');
            }
            // if ($request->get('fb_offer_type_id') == 12 || $request->get('retail_type_id') == 13) {
            if (in_array(12,$request->get('fb_offer_type_id'))) {
                $userApplication->other_type = $request->get('other_type');
            }

            if ($request->get('central_kitchen_id') == 1) {
                $userApplication->kitchen_footprint_area_id = $request->get('kitchen_footprint_area_id');
            }

            $companyProfilePath = 'company_profile';
            $fileExt = $request->file('company_profile')->getClientOriginalExtension();
            $companyProfileFileName = 'CP_'.Carbon::now()->timestamp . '.' . $fileExt;
            $companyProfileFilePath = $request->file('company_profile')->storeAs($companyProfilePath, $companyProfileFileName);
            $userApplication->commpany_profile_doc_name = $companyProfileFileName;
            $userApplication->company_profile_doc_path = $companyProfileFilePath;

            $qidPath = 'qid';
            $fileExt = $request->file('owner_partners_qid')->getClientOriginalExtension();
            $qidFileName = 'QID_'.Carbon::now()->timestamp . '.' . $fileExt;
            $qidFilePath = $request->file('owner_partners_qid')->storeAs($qidPath, $qidFileName);
            $userApplication->qid_name = $qidFileName;
            $userApplication->qid_path = $qidFilePath;
            $userApplication->declaration = 1;
            $userApplication->save();

            if($request->has('company_activity_type_id')){
                foreach($request->get('company_activity_type_id') as $company_activity_type_id){
                    $companyActivityOptions = new OtherOptions();
                    $companyActivityOptions->user_application_id = $userApplication->id;
                    $companyActivityOptions->option_name = 'company_activity_type';
                    $companyActivityOptions->option_id = $company_activity_type_id;
                    $companyActivityOptions->save();
                }
            }

            if($request->has('fb_type_id')){
                foreach($request->get('fb_type_id') as $fb_type_id){
                    $fbTypeIdOptions = new OtherOptions();
                    $fbTypeIdOptions->user_application_id = $userApplication->id;
                    $fbTypeIdOptions->option_name = 'fb_type';
                    $fbTypeIdOptions->option_id = $fb_type_id;
                    $fbTypeIdOptions->save();
                }
            }

            if($request->has('fb_offer_type_id')){
                foreach($request->get('fb_offer_type_id') as $fb_offer_type_id){
                    $fbOfferTypeIdOptions = new OtherOptions();
                    $fbOfferTypeIdOptions->user_application_id = $userApplication->id;
                    $fbOfferTypeIdOptions->option_name = 'fb_offer_type';
                    $fbOfferTypeIdOptions->option_id = $fb_offer_type_id;
                    $fbOfferTypeIdOptions->save();
                }
            }
            DB::commit();
            $this->sendApplicationMail($request, $userApplication->id);
            return array('status' => true);
        } catch (Exception $e) {
            Log::info("application error:" . json_encode($e->getMessage()));
            return array('status' => false, 'message' => trans('error.something_went_wrong'));
        }
    }

    public function sendApplicationMail(Request $request, $userApplicationId)
    {
        $user = User::find($request->attributes->get('user_id'));
        $userApplication = UserApplication::find($userApplicationId);

        $details = array(
            // 'name' => $user->first_name . ' ' . $user->last_name,
            'name' => $user->user_name,
            'email' => $user->email,
            'application_number' => $userApplication->application_number,
            'concept_name' => $userApplication->concept_name,
            'locale' => $request->attributes->get('lang'),
        );
        if (env('SEND_MAIL_QUEUE')) {
            $uniqueId = uniqid();
            $queueDelay = 0;
            $resetMailJob = (new SendEmailJob($details, 'userapplication', $uniqueId))->delay($queueDelay)->onQueue('default');
            dispatch($resetMailJob);
        } else {
            Mail::to($user->email)
                ->locale($request->attributes->get('lang'))
                ->send(new UserApplicationMail($details));
        }
        if ($user->user_type == 'FB') {
            $akhApplicationEmail = Configuration::where('name', 'AKH_APPLICATION_EMAIL')->value('value');

            $applicationDetails = array(
                'user' => $user,
                'email' => $akhApplicationEmail,
                'user_application' => $userApplication,
                'locale' => $request->attributes->get('lang'),
            );
            if (env('SEND_MAIL_QUEUE')) {
                $uniqueId = uniqid();
                $queueDelay = 0;
                $resetMailJob = (new SendEmailJob($applicationDetails, 'fbuserapplication', $uniqueId))->delay($queueDelay)->onQueue('default');
                dispatch($resetMailJob);
            } else {
                Mail::to($akhApplicationEmail)
                    ->locale($request->attributes->get('lang'))
                    ->send(new FBApplicationMail($applicationDetails));
            }
        }
    }

    public function download(Request $request, $type, $uniqueId)
    {
        $userApplication = UserApplication::where('application_number', $uniqueId)->first();
        if (!$userApplication) {
            return array('status' => false);
        }
        if ($type == 'companyprofile') {
            $fileName = $userApplication->commpany_profile_doc_name;
            $filePath = $userApplication->company_profile_doc_path;
        } elseif ($type == 'ktccimage') {
            $fileName = $userApplication->ktcc_image_name;
            $filePath = $userApplication->ktcc_image_path;
        } elseif ($type == 'commercial') {
            $fileName = $userApplication->commercial_document_name;
            $filePath = $userApplication->commercial_documnet_path;
        } elseif ($type == 'trade') {
            $fileName = $userApplication->trade_licence_doc_name;
            $filePath = $userApplication->trade_licence_doc_path;
        } elseif ($type == 'computercard') {
            $fileName = $userApplication->company_card_doc_name;
            $filePath = $userApplication->company_card_doc_path;
        } elseif ($type == 'qid') {
            $fileName = $userApplication->qid_name;
            $filePath = $userApplication->qid_path;
        } elseif ($type == 'homebusiness') {
            $fileName = $userApplication->home_business_license_name;
            $filePath = $userApplication->home_business_license_path;
        } else {
            return array('status' => false);
        }
        return array('status' => true, 'file_name' => $fileName, 'file_path' => $filePath);
    }
}
