<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name'  => 'required',
            'email'      => 'required|email',
            'phone'      => 'nullable',
            'message'    => 'required',
        ]);

        Contact::create($request->all());

        return response()->json([
            'message' => 'Message sent successfully'
        ]);
    }
}
