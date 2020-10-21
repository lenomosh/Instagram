<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;
use Psy\Util\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $all_posts = Post::with(['author.profile','comments.author','likes'])->get();
        foreach ($all_posts as $post){
            $post['path'] = Storage::url($post['path']);
            $post['user_has_liked'] = Like::where('user_id',$request->user()->id)->first();
        }
        return response()->json($all_posts,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[
            'image'=>'image:required',
            'caption'=>'required'
        ]);
        if ($validation->fails()) {
            return response()->json(['errors'=>$validation->errors()->all()],422);
        }
        $user_id =$request->user()->id;
        $image = $request->file('image');
        $name = $image->getClientOriginalName();
        $path = $image->store('public/images');
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
        $post->load(['author.profile','comments.author','likes']);
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
