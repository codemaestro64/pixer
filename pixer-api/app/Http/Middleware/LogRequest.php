<?php 

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LogRequest 
{
	/**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$guards
     * @return mixed
     */
	public function handle($request, Closure $next)
	{
		$res = $next($request);
		app('log')->info('req', $request->all());

		return $res;
	}
}