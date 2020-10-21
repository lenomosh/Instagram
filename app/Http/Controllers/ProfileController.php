<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Validator;
use Mockery\Exception;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $profiles = Profile::with(['owner.posts.likes','owner.posts.comments','followers'])->get();
        foreach ($profiles as $profile){
            $profile['user_has_followed'] = Follower::where('user_id',$request->user()->id)->where('id',$profile->id)->first();

        }
        return response()->json($profiles,200);
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
            'user_id'=>'int|required'
        ]);
        $profile = new Profile();
        $profile->user_id = $request->get('user_id');
        $profile->save();
        return response()->json($profile,200);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param \App\Models\Profile $profile
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request,Profile $profile)
    {
        $profile->load(['owner.posts.likes','owner.posts.comments','followers']);
        $profile['user_has_followed'] = Follower::where('user_id',$request->user()->id)->where('id',$profile->id)->first();
        return response()->json($profile,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Profile $profile)
    {
//        dump($request);
        $request->validate([
            "image"=>'file|nullable',
            "bio"=>"string|min:20|nullable"
        ]);

        if (!$request->has('image') && !$request->has('bio')) {
            return response()->json(null,403);
        }
        if ($request->hasFile('image')) {
            if (!is_null($profile->profile_picture)) {
                Storage::delete($profile->profile_picture);
            }
            $path = $request->file('image')->store('public/profile_pictures');
            $profile->profile_picture = $path;
        }
        if ($request->has('bio')) {
            $profile->bio = $request->get('bio');
        }
        $profile->save();
        return response()->json($profile,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Profile $profile)
    {
        try {
            if (!is_null($profile->profile_picture)) {
                Storage::delete($profile->profile_picture);
            }
            $profile->delete();
            return response()->json("Success",200);
        }catch (Exception $e){
            return response()->json($e->getMessage(),500);
        }
    }
}
