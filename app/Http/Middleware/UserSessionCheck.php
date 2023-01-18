<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserSessionCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(session()->has('token')){
            if(session()->get('token') != '' && session()->get('token') != null){
                $user = User::where('token',session()->get('token'))->where('user_type',session()->get('user_type'))->first();
                if($user){
                    $request->attributes->set('user_id',$user->id);
                    $request->attributes->set('user_type',$user->user_type);
                    return $next($request);
                }
            }
        }
        session()->forget('token');
        session()->forget('otp_verified');
        session()->forget('user_type');
        session()->forget('application_number');
        return redirect()->route('index');
    }
}
