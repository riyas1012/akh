<?php

namespace App\Http\Middleware;

use App\Models\Configuration;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SiteClosedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $configuration = Configuration::where('name','USER_APPLICATION_SITE')->first();
        if ( $configuration->value == 1 ) {
            return $next($request);
        } else {
            return redirect()->route('index');
        }
    }
}
