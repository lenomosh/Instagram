<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $comments = Comment::all();
        return response()->json($comments,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator= Validator::make($request->all(),[
            'content'=>'string|required',
            'post_id'=>'int|required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()->all()],422);
        }

        $user_id = $request->user()->id;
        $request['user_id']=$user_id;
        $comment = Comment::create( $request->all());
        return response()->json($comment->load(['author']),200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Comment $comment)
    {
        return response()->json($comment,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Comment $comment)
    {
        $request->validate([
            'content'=>'string|required'
        ]);
        $comment->update($request->all());
        return response()->json($comment,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Comment $comment)
    {
        try {
            $comment->delete();
            return response()->json("Success",200);
        }catch (Exception $exception){
            return  response()->json($exception->getMessage(),500);
        }
    }
}
