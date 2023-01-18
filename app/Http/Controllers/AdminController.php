<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\AdminController as ApiAdminController;
use App\Models\Admin;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Datatables;
use Yajra\DataTables\Facades\DataTables as FacadesDataTables;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        if (session()->has('admin_token') && session()->get('admin_token') != "") {
            return redirect()->route('admin.dashboard');
        }
        session()->forget('admin_token');
        session()->forget('admin_name');
        session()->forget('admin_type');
        return view('pages.admin.index');
    }

    public function login(Request $request)
    {
        $apiAdminController = new ApiAdminController;
        $loginStatus = $apiAdminController->login($request);
        if (!$loginStatus['status']) {
            return back()->withErrors($loginStatus['message'])->withInput();
        }
        $admin = $loginStatus['admin'];
        session()->put('admin_token', $admin->token);
        session()->put('admin_name', $admin->name);
        session()->put('admin_type', $admin->admin_type);
        return redirect()->route('admin.dashboard');
    }

    public function logout(Request $request)
    {

        $apiAdminController = new ApiAdminController;
        $logoutStatus = $apiAdminController->logout($request);
        if (!$logoutStatus['status']) {
            return back()->withErrors($logoutStatus['message']);
        }
        session()->forget('admin_token');
        session()->forget('admin_name');
        session()->forget('admin_type');
        return redirect()->route('admin.index');
    }

    public function dashboard(Request $request)
    {
        $apiAdminController = new ApiAdminController;
        $dashboardDetails = $apiAdminController->getdasboardDetails($request);
        return view('pages.admin.dashboard', [
            'dashboard_details' => $dashboardDetails,
        ]);
    }

    public function operators(request $request)
    {
        return view('pages.admin.operators.lists', [
            'admins' => Admin::get(),
        ]);
    }

    public function operatorsAdd(Request $request)
    {
        return view('pages.admin.operators.add');
    }

    public function operatorsStore(Request $request)
    {
        $apiAdminController = new ApiAdminController;
        $registerStatus = $apiAdminController->operatorsStore($request);
        if (!$registerStatus['status']) {
            return back()->withInput()->withErrors($registerStatus['message']);
        }
        return redirect()->route('admin.operators')->with('success', 'Successfully Created');
    }

    public function createPassword(Request $request, $passwordToken)
    {
        session()->forget('admin_token');
        session()->forget('admin_name');
        session()->forget('admin_type');
        $apiAdminController = new ApiAdminController;
        $createPasswordStatus = $apiAdminController->createPassword($request, $passwordToken);
        if (!$createPasswordStatus['status']) {
            return redirect()->route('admin.index')->withErrors($createPasswordStatus['message']);
        }
        return view('pages.admin.operators.create_password', [
            'email' => $createPasswordStatus['email'],
            'token' => $passwordToken,
        ]);
    }

    public function updatePassword(Request $request, $passwordToken)
    {
        $apiAdminController = new ApiAdminController;
        $createPasswordStatus = $apiAdminController->updatePassword($request, $passwordToken);
        if (!$createPasswordStatus['status']) {
            if ($createPasswordStatus['redirect'] == 'index') {
                return redirect()->route('admin.index')->withErrors($createPasswordStatus['message']);
            } else {
                return back()->withErrors($createPasswordStatus['message']);
            }

        }
        return redirect()->route('admin.index')->with('success', 'Password created successfully');
    }

    public function operatorEdit(Request $request, $operatorId)
    {
        $apiAdminController = new ApiAdminController;
        $editOperatorStatus = $apiAdminController->operatorsEdit($request, $operatorId);
        if (!$editOperatorStatus['status']) {
            return back()->withInput()->withErrors($editOperatorStatus['message']);
        }
        return view('pages.admin.operators.edit', [
            'admin' => $editOperatorStatus['admin'],
            'operator_id' => $operatorId,
        ]);
    }

    public function operatorUpdate(Request $request, $operatorId)
    {
        $apiAdminController = new ApiAdminController;
        $updateOperatorStatus = $apiAdminController->operatorsUpdate($request, $operatorId);
        if (!$updateOperatorStatus['status']) {
            return back()->withInput()->withErrors($updateOperatorStatus['message']);
        }
        return redirect()->route('admin.operators')->with('success', 'Updated successfully');
    }

    public function applications(Request $request)
    {
        $apiAdminController = new ApiAdminController;
        // $applicationCollection = $apiAdminController->allApplicationCollection($request);
        // $applications = $applicationCollection->whereNotIn('status', ['Rejected', 'Shortlisted'])->all();
        $applicationPredefinedValues = $apiAdminController->getApplicationPredefinedValues();
        return view('pages.admin.applications.list', [
            // 'applications' => $applications,
            'company_activity_type' => $applicationPredefinedValues['company_activity_type'],
            'fb_types' => $applicationPredefinedValues['fb_types'],
            'unit_types' => $applicationPredefinedValues['unit_types'],
            'fb_offer_types' => $applicationPredefinedValues['fb_offer_types'],
        ]);
    }

    public function applicationDetails(Request $request, $applicationNumber)
    {
        $apiAdminController = new ApiAdminController;
        $applicationCollection = $apiAdminController->allApplicationCollection($request);
        $applicationDetails = $applicationCollection->where('application_number', $applicationNumber)->first();
        return view('pages.admin.applications.details', [
            'application' => $applicationDetails,
            'application_number' => $applicationNumber,
        ]);
    }

    public function applicationDetailsEdit(Request $request, $applicationNumber)
    {
        $apiAdminController = new ApiAdminController;
        $applicationUpdateStatus = $apiAdminController->applicationDetailsEdit($request, $applicationNumber);
        if (!$applicationUpdateStatus['status']) {
            if ($applicationUpdateStatus['redirect'] == 'index') {
                return redirect()->route('admin.index')->withErrors($applicationUpdateStatus['message']);
            } else {
                return back()->withErrors($applicationUpdateStatus['message']);
            }
        }
        return redirect()->route('admin.applications')->with('success', 'Updated Successfully');
    }

    public function applicationSearch(Request $request){
        $apiAdminController = new ApiAdminController;
        $applicationSearch = $apiAdminController->applicationSearch($request);
        // return $applicationSearch;
        return FacadesDataTables::of($applicationSearch)->rawColumns([
            'ktcc_image_path',
            'company_profile',
            'commercial',
            'trade',
            'computercard',
            'qid',
            'action'
        ])->toJson();;
    }

    public function configuration(Request $request){
        $configuration = Configuration::where('name','USER_APPLICATION_SITE')->first();
        return view('pages.admin.configuration',[
            'configuration' => $configuration
        ]);
    }

    public function updateConfiguration(Request $request){
        $apiAdminController = new ApiAdminController;
        $configurationUpdate = $apiAdminController->updateConfiguration($request);
        return redirect()->route('admin.configuration')->with('success','Configuration Updated Successfully.');
    }
}
