<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Mockery\Exception;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $likes = Like::all();
        return response()->json($likes,200);
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
            'user_id'=>'required|int',
            'post_id'=>'required|int'
        ]);
        $like = Like::create($request->all());
        return response()->json($like,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Like $like)
    {
        return response()->json($like,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Like $like)
    {
        return $this->destroy($like);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Like $like)
    {
        try {
            $like->delete();
            return response()->json('Success',200);
        }catch (Exception $exception){
            return response()->json($exception->getMessage(),500);
        }
    }
}
