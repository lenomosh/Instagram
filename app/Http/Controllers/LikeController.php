<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        $validations = Validator::make($request->all(),[
            'post_id'=>'required|int'
        ]);
        if ($validations->fails()) {
            return response()->json(['errors'=>$validations->errors()->all()],422);
        }
        $user_id = $request->user()->id;
        $post_id = $request->get('post_id');
        $query = Like::where('user_id',$user_id)->where('post_id',$post_id)->get();
        if (count($query)) {
            return response()->json("Already Liked",409);
        }
        $like = Like::create([
            'post_id'=>$post_id,
            'user_id'=>$user_id
        ]);
        return response()->json(["message"=>"Liked!"],200);
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
