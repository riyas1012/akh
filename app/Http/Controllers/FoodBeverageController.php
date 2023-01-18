<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\UserApplicationController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

class FoodBeverageController extends Controller
{
    public function index(Request $request)
    {
        if (session()->has('locale') && session()->get('locale') != '') {
            App::setLocale(session()->get('locale'));
        } else {
            App::setLocale('en');
            session()->put('locale', 'en');
        }
        if (session()->has('token') && session()->get('token') != "") {
            if (session()->has('user_type') && session()->get('user_type') != "") {
                if (session()->has('otp_verified') && session()->get('otp_verified') == 1) {
                    return redirect()->route('food.beverage.application');
                }
            }
        }
        session()->forget('token');
        session()->forget('otp_verified');
        session()->forget('user_type');
        session()->forget('application_number');
        return view('pages.food_beverage.index');
    }

    public function register(Request $request)
    {
        return view('pages.food_beverage.register');
    }

    public function store(Request $request)
    {
        $apiUserController = new UserController;
        $registerStatus = $apiUserController->register($request, 'FB');
        if (!$registerStatus['status']) {
            return back()->withErrors($registerStatus['message'])->withInput();
        }
        session()->flash('success', trans('success.register'));
        return redirect()->route('food.beverage');
    }

    public function login(Request $request)
    {
        $apiUserController = new UserController;
        $loginStatus = $apiUserController->login($request, 'FB');
        if (!$loginStatus['status']) {
            return back()->withErrors($loginStatus['message'])->withInput();
        }
        $user = $loginStatus['user'];
        session()->put('token', $user->token);
        session()->put('user_type', $user->user_type);
        if (env('OTP_VERIFY')) {
            return redirect()->route('otp');
        }
        return redirect()->route('food.beverage.application');
    }

    public function application(Request $request)
    {
        $apiUserApplicationController = new UserApplicationController();
        $details = $apiUserApplicationController->getApplicationNeededDetails($request);
        session()->put('application_number', $details['application_number']);
        return view('pages.food_beverage.application', [
            'user' => $details['user'],
            'years_of_experiences' => $details['years_of_experiences'],
            'company_activity_type' => $details['company_activity_type'],
            'existing_branches' => $details['existing_branches'],
            'fb_types' => $details['fb_types'],
            'unit_types' => $details['unit_types'],
            'no_of_employees' => $details['no_of_employees'],
            'ktcc' => $details['ktcc'],
            'central_kitchen' => $details['central_kitchen'],
            'kitchen_footprint' => $details['kitchen_footprint'],
            'fb_offer_types' => $details['fb_offer_types'],
        ]);
    }

    public function saveApplication(Request $request)
    {
        Log::info("request:". json_encode($request->all()));
        $apiUserApplicationController = new UserApplicationController;
        $applicationStatus = $apiUserApplicationController->saveApplication($request, session()->get('application_number'));
        if (!$applicationStatus['status']) {
            return back()->withErrors($applicationStatus['message'])->withInput();
        }
        session()->forget('application_number');
        return redirect()->route('food.beverage.application')->with('success', trans('success.application_submit'));
    }

    public function forgotPassword(Request $request)
    {
        return view('pages.forgot_password');
    }

    public function forgotPasswordLink(Request $request)
    {
        $apiUserController = new UserController;
        $forgotPasswordStatus = $apiUserController->forgotPasswordLink($request, 'FB');
        if (!$forgotPasswordStatus['status']) {
            return back()->withErrors($forgotPasswordStatus['message'])->withInput();
        }
        return redirect()->route('food.beverage')->with('success', trans('success.reset_password_link'));
    }

    public function resetPassword(Request $request, $passwordResetToken)
    {
        $apiUserController = new UserController;
        $resetPasswordStatus = $apiUserController->resetPassword($request, $passwordResetToken);
        if (!$resetPasswordStatus['status']) {
            return redirect()->route('food.beverage')->withErrors($resetPasswordStatus['message']);
        }
        return view('pages.reset_password', [
            'email' => $resetPasswordStatus['email'],
            'token' => $passwordResetToken,
        ]);
    }

    public function resetPasswordUpdate(Request $request, $passwordResetToken)
    {
        $apiUserController = new UserController;
        $resetPasswordStatus = $apiUserController->resetPasswordUpdate($request, $passwordResetToken);
        if (!$resetPasswordStatus['status']) {
            return back()->withErrors($resetPasswordStatus['message']);
        }
        return redirect()->route('food.beverage')->with('success', trans('success.password_reseted'));
    }
}
