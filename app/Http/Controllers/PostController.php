<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mockery\Exception;
use Psy\Util\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $all_posts = Post::all();
        return response()->json($all_posts,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'image'=>'image:required',
            'caption'=>'required'
        ]);
        $user_id =2;
        $image = $request->file('image');
        $name = $image->getClientOriginalName();
        $path = $image->store('images');
        $caption = $request->get('caption');
        $post = Post::create([
            'name'=>$name,
            'path'=>$path,
            'user_id'=>$user_id,
            'caption'=>$caption
        ]);
        return $post;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Post $post)
    {
        return response()->json($post,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Post $post)
    {
//        $data;
        $request->validate([
            'caption'=>'string|required'
        ]);
//        if ($request->hasFile('image')) {
//            print("image");
//            $image = $request->file('image');
//            Storage::delete($post->image);
//            $image->store('images');
//            $data[] = ['path'=>$image];
//        }
//        if ($request->has('caption')) {
//            print("caption yes");
//            array_push($data,[
//                'caption'=>$request->get('caption')
//            ]);
//        };
        $post->update([
            'caption'=>$request->get('caption')
        ]);
        return response()->json($post,200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        try {
            Storage::delete($post->path);
            $post->delete();
            return response()->json("Success!",200);
        }catch (Exception $exception){
            return response()->json($exception->getMessage(),500);
        }
    }
}
