<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $users = User::paginate(5);
        return response()->json([
            'status' => 'success',
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        $exist = User::where('email', '=', $request->email)->first();

        if ($exist !== null) {
            return response()->json([
                'status' => 'false',
                'title' => 'Email exists',
                'message' => 'Another User uses that email already.',
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);
        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $exist = User::where('email', '=', $request->email)->first();

        if ($exist->id != $id) {
            return response()->json([
                'status' => 'false',
                'title' => 'Email exists',
                'message' => 'Another User uses that email already.',
                'user' => $exist,
            ], 422);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'nullable|string',
        ]);

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if (trim($request->password) !== '' && $request->password != null) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if ($user->role == 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Can\'t delete admin',
            ], 403);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully',
            'user' => $user,
        ]);
    }

    public function destroy_many(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer'
        ]);

        $users = User::whereIn('id', $request->ids)->where('role', '=', 'user')->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Users deleted successfully',
            'users' => $users,
        ]);
    }
}
