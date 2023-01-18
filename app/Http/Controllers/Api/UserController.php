<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;
use App\Mail\OtpMail;
use App\Mail\RegisterMail;
use App\Mail\ResetPasswordEMail;
use App\Models\PasswordReset;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
class UserController extends Controller
{
    public function register(Request $request, $userType)
    {
        $rules = array(
            // 'first_name' => 'required',
            // 'last_name' => 'required',
            // 'user_name' => 'required',
            'email' => 'required|email|unique:users',
            'phone_number' => 'required|unique:users',
            'password' => 'required',
        );

        $validator = Validator::make(
            $request->all(),
            $rules
        );
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }
        $accountActivationKey = $this->generateRandomKey(12);

        $user = new User();
        // $user->first_name = $request->get('first_name');
        // $user->last_name = $request->get('last_name');
        // $user->user_name = $request->get('user_name');
        $user->email = $request->get('email');
        $user->phone_number = $request->get('phone_number');
        $user->password = Hash::make($request->get('password'));
        $user->user_type = $userType;
        $user->email_verification_token = $accountActivationKey;
        $user->is_email_verified = 0;
        $user->save();

        $url = url('account-verification', [$accountActivationKey]);
        $details = array(
            // 'name' => $user->first_name . ' ' . $user->last_name,
            'name' => $user->user_name,
            'email' => $user->email,
            'url' => $url,
            'user_type' => $userType,
            'locale' => $request->attributes->get('lang'),

        );

        if (env('SEND_MAIL_QUEUE')) {
            $uniqueId = uniqid();
            $queueDelay = 0;
            $resetMailJob = (new SendEmailJob($details, 'registermail', $uniqueId))->delay($queueDelay)->onQueue('default');
            dispatch($resetMailJob);
        } else {
            Mail::to($user->email)
            ->locale($request->attributes->get('lang'))
            ->send(new RegisterMail($details));
        }
        return array('status' => true);
    }

    public function login(Request $request, $userType)
    {
        $rules = array(
            'email' => 'required',
            'password' => 'required',
        );

        $validator = Validator::make(
            $request->all(),
            $rules
        );
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }

        $user = User::where('email', $request->get('email'))->where('user_type', $userType)->first();
        if (!$user) {
            return array('status' => false, 'message' => trans('error.not_registered_user'));
        }
        if (Hash::check($request->get('password'), $user->password)) {
            if ($user->is_email_verified == 0) {
                return array('status' => false, 'message' => 'Please Activate the account');
            }
            $token = $this->generateRandomKey(32);
            $user->token = $token;
            if (env('OTP_VERIFY')) {
                $otp = random_int(1000, 9999);
                $user->otp_token = $otp;
                $details = array(
                    // 'name' => $user->first_name . ' ' . $user->last_name,
                    'name' => $user->user_name,
                    'email' => $user->email,
                    'otp_code' => $otp,
                    'locale' => $request->attributes->get('lang'),
                );
                if (env('SEND_MAIL_QUEUE')) {
                    $uniqueId = uniqid();
                    $queueDelay = 0;
                    $resetMailJob = (new SendEmailJob($details, 'otpmail', $uniqueId))->delay($queueDelay)->onQueue('default');
                    dispatch($resetMailJob);
                } else {
                    Mail::to($user->email)
                    ->locale($request->attributes->get('lang'))
                    ->send(new OtpMail($details));
                }
            }
            $user->save();

            return array('status' => true, 'user' => $user);
        } else {
            return array('status' => false, 'message' => trans('error.invalid_password'));
        }

    }

    public function generateRandomKey($length = 32)
    {
        return substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
    }

    public function accountVerification(Request $request, $activationKey)
    {
        $user = User::where('email_verification_token', $activationKey)->first();
        if (!$user) {
            return array('status' => false, 'message' => 'Invalid verification code');
        }

        if ($user->is_email_verified == 1) {
            return array('status' => false, 'message' => 'Account is already Activated');
        }

        User::where('id', $user->id)->update(array(
            'is_email_verified' => 1,
            'email_verified_at' => Carbon::now(),
        ));

        return array('status' => true, 'user_type' => $user->user_type);
    }

    public function otpResend(Request $request)
    {
        $user = User::find($request->attributes->get('user_id'));
        $otp = random_int(1000, 9999);
        User::where('id', $user->id)->update(array(
            'otp_token' => $otp,
        ));
        $details = array(
            // 'name' => $user->first_name . ' ' . $user->last_name,
            'name' => $user->user_name,
            'email' => $user->email,
            'otp_code' => $otp,
            'locale' => $request->attributes->get('lang'),
        );
        if (env('SEND_MAIL_QUEUE')) {
            $uniqueId = uniqid();
            $queueDelay = 0;
            $resetMailJob = (new SendEmailJob($details, 'otpmail', $uniqueId))->delay($queueDelay)->onQueue('default');
            dispatch($resetMailJob);
        } else {
            Mail::to($user->email)
            ->locale($request->attributes->get('lang'))
            ->send(new OtpMail($details));
        }
        return array('status' => true);
    }

    public function otpVerification(Request $request)
    {

        $rules = array(
            'digit1' => 'required|integer',
            'digit2' => 'required|integer',
            'digit3' => 'required|integer',
            'digit4' => 'required|integer',
        );

        $validator = Validator::make(
            $request->all(),
            $rules
        );
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }
        $otpDigitCombine = $request->get('digit1') . $request->get('digit2') . $request->get('digit3') . $request->get('digit4');
        $user = User::where('id', $request->attributes->get('user_id'))->where('otp_token', $otpDigitCombine)->first();
        if (!$user) {
            return array('status' => false, 'message' => 'Please enter valid OTP.');
        }
        User::where('id', $request->attributes->get('user_id'))->update(array(
            'otp_token' => null,
        ));
        return array('status' => true);
    }

    public function logout(Request $request)
    {
        $user = User::find($request->attributes->get('user_id'));
        if (!$user) {
            return array('status' => false, 'message' => 'Invalid User details');
        }
        User::where('id', $request->attributes->get('user_id'))->update(array(
            'token' => null,
        ));
        return array('status' => true);
    }
    public function forgotPasswordLink(Request $request, $userType)
    {
        $rules = array(
            'email' => 'required',
        );

        $validator = Validator::make(
            $request->all(),
            $rules
        );
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }

        $user = User::where('email', $request->get('email'))->where('user_type', $userType)->first();
        if (!$user) {
            return array('status' => false, 'message' => 'Invalid User details');
        }
        $passwordResetUser = PasswordReset::where('email', $user->email)->first();
        if ($passwordResetUser) {
            $token = $passwordResetUser->token;
        } else {
            $token = $this->generateRandomKey(10);
            $passwordResetUser = new PasswordReset();
            $passwordResetUser->email = $user->email;
            $passwordResetUser->token = $token;
            $passwordResetUser->created_at = Carbon::now();
            $passwordResetUser->save();
        }
        $url = route('reset.password', ['reset_token' => $token]);
        $details = array(
            // 'name' => $user->first_name . ' ' . $user->last_name,
            'name' => $user->user_name,
            'email' => $user->email,
            'url' => $url,
            'locale' => $request->attributes->get('lang'),
        );
        if (env('SEND_MAIL_QUEUE')) {
            $uniqueId = uniqid();
            $queueDelay = 0;
            $resetMailJob = (new SendEmailJob($details, 'resetpasswordmail', $uniqueId))->delay($queueDelay)->onQueue('default');
            dispatch($resetMailJob);
        } else {
            Mail::to($user->email)
            ->locale($request->attributes->get('lang'))
            ->send(new ResetPasswordEMail($details));
        }

        return array('status' => true);
    }

    public function resetPassword(Request $request, $passwordResetToken)
    {
        $passwordReset = PasswordReset::where('token', $passwordResetToken)->first();
        if (!$passwordReset) {
            return array('status' => false, 'message' => 'invalid password reset link.');
        }
        return array('status' => true, 'email' => $passwordReset->email);
    }

    public function resetPasswordUpdate(Request $request, $passwordResetToken)
    {
        $rules = array(
            'password' => 'required|min:8|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'required|min:8',
        );

        $validator = Validator::make(
            $request->all(),
            $rules
        );
        if ($validator->fails()) {
            return array('status' => false, 'message' => $validator, 'error_code' => '100');
        }
        $passwordReset = PasswordReset::where('token', $passwordResetToken)->first();
        if (!$passwordReset) {
            return array('status' => false, 'message' => 'invalid password reset link.');
        }

        User::where('email', $passwordReset->email)->update(array(
            'password' => Hash::make($request->get('password')),
        ));
        $passwordReset = PasswordReset::where('token', $passwordResetToken)->delete();
        return array('status' => true);
    }
}
