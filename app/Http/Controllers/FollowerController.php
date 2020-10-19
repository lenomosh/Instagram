<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;
use Mockery\Exception;

class FollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $all = Follower::all();
        return response()->json($all,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id'=>'int|required',
            'profile_id'=>'int|required'
        ]);
        $follower = Follower::create($request->all());
        return response()->json($follower,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Follower  $follower
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Follower $follower)
    {
        return response()->json($follower,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Follower  $follower
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Follower $follower)
    {
        return $this->destroy($follower);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Follower  $follower
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Follower $follower)
    {
        try {
            $follower->delete();
            return  response()->json("Success",200);
        }catch (Exception $exception){
            return response()->json($exception->getMessage(),500);
        }
    }
}
