<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $allowedOrigin = 'http://localhost:3000';
        $allowedMethods = 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
        $allowedHeaders = 'Content-Type, Authorization, X-Requested-With, Accept, Origin';

        // Handle preflight OPTIONS requests
        if ($request->isMethod('OPTIONS')) {
            return response()->noContent(204, [
                'Access-Control-Allow-Origin' => $allowedOrigin,
                'Access-Control-Allow-Methods' => $allowedMethods,
                'Access-Control-Allow-Headers' => $allowedHeaders,
                'Access-Control-Allow-Credentials' => false,
            ]);
        }

        // Handle actual request
        $response = $next($request);

        if (method_exists($response, 'header')) {
            $response->header('Access-Control-Allow-Origin', $allowedOrigin)
                     ->header('Access-Control-Allow-Methods', $allowedMethods)
                     ->header('Access-Control-Allow-Headers', $allowedHeaders)
                     ->header('Access-Control-Allow-Credentials', false);
        }

        return $response;
    }
}
