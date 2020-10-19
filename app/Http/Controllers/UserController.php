<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mockery\Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|min:3',
            'email'=>'required|email',
            'password'=>'required|min:8'
        ]);
        $password = Hash::make($request->get('password'));
        $email = $request->get('email');
        $query = User::where('email',$email)->get();
        if (count($query)) {
            return response()->json("User with the email already exists",409);
        }
        $user = User::create([
            'name'=>$request->get('name'),
            'email'=>$email,
            'password'=>$password
        ]);
        $profile = Profile::create([
            'user_id'=>$user->id
        ]);
        return response()->json($user,200);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return JsonResponse
     */
    public function show(User $user)
    {
        return response()->json($user,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function update(Request $request, User $user)
    {

        $user->update($request->all());
        return response()->json($user,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return JsonResponse
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json("Success",200);

        }
        catch (Exception $exception){
            return response()->json($exception->getMessage(),500);
        }
    }
}
