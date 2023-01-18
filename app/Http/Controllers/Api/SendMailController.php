<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\AdminApplicationMail;
use App\Mail\AdminPasswordMail;
use App\Mail\FBApplicationMail;
use App\Mail\OtpMail;
use App\Mail\RegisterMail;
use App\Mail\ResetPasswordEMail;
use App\Mail\UserApplicationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendMailController extends Controller
{
    public function sendOtpMail($details){
        Log::info("inside sendOtpMail function");
        Mail::to($details['email'])
        ->locale($details['locale'])
        ->send(new OtpMail($details));
    }

    public function sendResetMail($details){
        Log::info("inside sendResetMail function");
        Mail::to($details['email'])
        ->locale($details['locale'])
        ->send(new ResetPasswordEMail($details));
    }

    public function sendUserRegisterMail($details){
        Log::info("inside sendUserRegisterMail function");
        Mail::to($details['email'])
        ->locale($details['locale'])
        ->send(new RegisterMail($details));
    }

    public function sendUserapplicationMail($details){
        Log::info("inside sendUserapplicationMail function");

        Mail::to($details['email'])
        -> locale($details['locale'])
        ->send(new UserApplicationMail($details));
    }

    public function sendFBUserApplicationMail($details){
        Log::info("inside sendFBUserApplicationMail function");


        Mail::to($details['email'])
        -> locale($details['locale'])
        ->send(new FBApplicationMail($details));
    }

    public function sendAdminCreatePassword($details){

        Log::info("inside sendAdminCreatePassword function");
        Mail::to($details['email'])
                    ->send(new AdminPasswordMail($details));
    }

    public function sendAdminApplicantionMail($details){
        Log::info("inside sendAdminCreatePassword function");
        Mail::to($details['email'])
            ->send(new AdminApplicationMail($details));
    }

}
