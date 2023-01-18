<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\UserApplicationController;
use App\Http\Controllers\Api\UserController;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $configuration = Configuration::where('name','USER_APPLICATION_SITE')->first();
        if ( $configuration->value != 1 ) {
            return view('pages.site_closed');
        }
        if (session()->has('locale') && session()->get('locale') != '') {
            App::setLocale(session()->get('locale'));
        } else {
            App::setLocale('en');
            session()->put('locale', 'en');
        }
        if (session()->has('token') && session()->get('token') != "") {
            if (session()->has('user_type') && session()->get('user_type') != "") {
                if (session()->get('user_type') == 'FB') {
                    return redirect()->route('food.beverage');
                } elseif (session()->get('user_type') == 'Retail') {
                    return redirect()->route('retail');
                }
            }
        }
        session()->forget('token');
        session()->forget('otp_verified');
        session()->forget('user_type');
        session()->forget('application_number');
        return view('pages.landing_page');
    }

    public function lang($locale)
    {
        if ($locale == 'en' || $locale == 'ar') {
            App::setLocale($locale);
            session()->put('locale', $locale);
        } else {
            App::setLocale('en');
            session()->put('locale', 'en');
        }
        return redirect()->back();
    }

    public function accountVerification(Request $request, $activationKey)
    {
        $apiUserController = new UserController;
        $accountActivationSatus = $apiUserController->accountVerification($request, $activationKey);
        if (!$accountActivationSatus['status']) {
            return redirect()->route('index')->withErrors($accountActivationSatus['message']);
        }
        if ($accountActivationSatus['user_type'] == 'FB') {
            return redirect()->route('food.beverage')->with('success', trans('success.account_activated'));
        }
        return redirect()->route('retail')->with('success', trans('success.account_activated'));
    }

    public function getOtpPage(Request $request)
    {
        return view('pages.otp');
    }

    public function otpResend(Request $request)
    {
        $apiUserController = new UserController;
        $resetPasswordStatus = $apiUserController->otpResend($request);
        if (!$resetPasswordStatus['status']) {
            return back()->withErrors($resetPasswordStatus['message']);
        }
        return back()->with('success', trans('success.otp_reset'));
    }

    public function otpVerification(Request $request)
    {
        $apiUserController = new UserController;
        $otpVerifiedStatus = $apiUserController->otpVerification($request);
        if (!$otpVerifiedStatus['status']) {
            return back()->withErrors($otpVerifiedStatus['message']);
        }
        session()->put('otp_verified', 1);
        if (session()->get('user_type') == 'FB') {
            return redirect()->route('food.beverage.application');
        }
        return redirect()->route('retail');
    }

    public function logout(Request $request)
    {
        $apiUserController = new UserController;
        $logoutStatus = $apiUserController->logout($request);
        if (!$logoutStatus['status']) {
            return back()->withErrors($logoutStatus['message']);
        }
        session()->forget('token');
        session()->forget('otp_verified');
        session()->forget('user_type');
        session()->forget('application_number');
        return redirect()->route('index');
    }

    public function download(Request $request, $type, $uniqueId)
    {
        $apiUserApplicationController = new UserApplicationController;
        $applicationStatus = $apiUserApplicationController->download($request, $type, $uniqueId);
        if ($applicationStatus['status']) {
            return Storage::download($applicationStatus['file_path']);
        }
        return redirect()->route('index');
    }

    public function siteClosed(Request $request){
        return view('pages.site_closed');
    }

}
