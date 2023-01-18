<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\UserApplicationController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class RetailController extends Controller
{
    // public function index(Request $request){
    //     if(session()->has('locale') && session()->get('locale') != ''){
    //         App::setLocale(session()->get('locale'));
    //     }
    //     else{
    //         App::setLocale('en');
    //         session()->put('locale', 'en');
    //     }
    //     return view('pages.retail.index');
    // }

    // public function register(Request $request){
    //     return view('pages.retail.register');
    // }

    // public function store(Request $request){
    //     $apiUserController = new UserController;
    //     $registerStatus = $apiUserController->register($request,'Retail');
    //     if (!$registerStatus['status']) {
    //         return back()->withErrors($registerStatus['message'])->withInput();
    //     }
    //     session()->flash('success', 'Successfully Registered.');
    //     return redirect()->route('retail');
    // }

    // public function login(Request $request){
    //     $apiUserController = new UserController;
    //     $loginStatus = $apiUserController->login($request,'Retail');
    //     if (!$loginStatus['status']) {
    //         return back()->withErrors($loginStatus['message'])->withInput();
    //     }

    //     $user = $loginStatus['user'];
    //     session()->put('token',$user->token);
    //     session()->put('user_type',$user->user_type);
    //     return redirect()->route('retail');
    // }


    public function index(Request $request){
        if(session()->has('locale') && session()->get('locale') != ''){
            App::setLocale(session()->get('locale'));
        }
        else{
            App::setLocale('en');
            session()->put('locale', 'en');
        }
        if(session()->has('token') && session()->get('token') != "")
        {
            if(session()->has('user_type') && session()->get('user_type') != ""){
                if(session()->has('otp_verified') && session()->get('otp_verified') == 1){
                    return redirect()->route('retail.application');
                }
            }
        }
        session()->forget('token');
        session()->forget('otp_verified');
        session()->forget('user_type');
        session()->forget('application_number');
        return view('pages.retail.index');
    }

    public function register(Request $request){
        return view('pages.retail.register');
    }

    public function store(Request $request){
        $apiUserController = new UserController;
        $registerStatus = $apiUserController->register($request,'Retail');
        if (!$registerStatus['status']) {
            return back()->withErrors($registerStatus['message'])->withInput();
        }
        session()->flash('success', trans('success.register'));
        return redirect()->route('retail');
    }

    public function login(Request $request){
        $apiUserController = new UserController;
        $loginStatus = $apiUserController->login($request,'Retail');
        if (!$loginStatus['status']) {
            return back()->withErrors($loginStatus['message'])->withInput();
        }
        $user = $loginStatus['user'];
        session()->put('token',$user->token);
        session()->put('user_type',$user->user_type);
        if (env('OTP_VERIFY')) {
            return redirect()->route('otp');
        }
        return redirect()->route('retail.application');
    }

    public function application(Request $request){
        $apiUserApplicationController = new UserApplicationController();
        $details = $apiUserApplicationController->getApplicationNeededDetails($request);
        session()->put('application_number',$details['application_number']);
        return view('pages.retail.application' ,[
            'user' => $details['user'],
            'years_of_experiences' => $details['years_of_experiences'],
            'company_activity_type' => $details['company_activity_type'],
            'existing_branches' => $details['existing_branches'],
            'unit_types' => $details['unit_types'],
            'no_of_employees' => $details['no_of_employees'],
            'ktcc' => $details['ktcc'],
            'central_kitchen' => $details['central_kitchen'],
            'kitchen_footprint' => $details['kitchen_footprint'],
            'retail_types' => $details['retail_types'],
        ]);
    }

    public function saveApplication(Request $request){
        $request->attributes->set('lang',session()->get('locale'));
        $apiUserApplicationController = new UserApplicationController;
        $applicationStatus = $apiUserApplicationController->saveApplication($request,session()->get('application_number'));
        if (!$applicationStatus['status']) {
            return back()->withErrors($applicationStatus['message'])->withInput();
        }
        session()->forget('application_number');
        return redirect()->route('retail.application')->with('success',trans('success.application_submit'));
    }
}
