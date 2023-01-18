<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;

class AdminSessionMiddleware
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
        if(session()->has('admin_token')){
            if(session()->get('admin_token') != '' && session()->get('admin_token') != null){
                $admin = Admin::where('token',session()->get('admin_token'))->where('admin_type',session()->get('admin_type'))->first();
                if($admin){
                    $request->attributes->set('admin_id',$admin->id);
                    $request->attributes->set('admin_type',$admin->admin_type);
                    return $next($request);
                }
            }
        }
        session()->forget('admin_token');
        session()->forget('admin_name');
        session()->forget('admin_type');
        return redirect()->route('admin.index');
    }
}
