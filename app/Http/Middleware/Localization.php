<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;


class Localization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (session()->has('locale')) {
            App::setLocale(session()->get('locale'));
            URL::defaults(['locale' => session()->get('locale')]);
            $request->attributes->set('lang',session()->get('locale'));
        }
        else{
            App::setLocale('en');
            URL::defaults(['locale' => 'en']);
            $request->attributes->set('lang','en');
        }
        return $next($request);
    }
}
