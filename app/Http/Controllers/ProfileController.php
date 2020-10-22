<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Validator;
use Mockery\Exception;
use Psy\Util\Str;

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
            if ($profile->profile_picture) {

                $profile['profile_picture'] = Storage::url($profile->profile_picture);
            }
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
        if (!is_null($profile->profile_picture)) {
            $profile['profile_picture']= Storage::url($profile->profile_picture);
        }
        $profile['user_has_followed'] = Follower::where('user_id',$request->user()->id)->where('profile_id',$profile->id)->first();
        $profile['following']=Profile::where('user_id',$profile->owner->id)->where('id','!=',$profile->id)->get();
        foreach ($profile->owner->posts as $post){
            $post['path']=Storage::url($post->path);
        }
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
        $validator= \Illuminate\Support\Facades\Validator::make($request->all(),[
            "image"=>'file|nullable',
            "bio"=>"string|min:1|nullable"
        ]);
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()->all()],422);
        }

        if (!$request->hasFile('image') && !$request->has('bio')) {
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

    public function search(Request $request){
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(),[
            'q'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()->all()],422);
        }
        $q = $request->get('q');
        $results =[];
        $profiles = DB::table('profiles')
            ->join('users','users.id','=','profiles.user_id')
            ->where('bio','LIKE','%'.$q.'%')
            ->orWhere('username','LIKE','%'.$q.'%')
            ->orWhere('name','LIKE','%'.$q.'%')->get();
        if (count($profiles)) {
            foreach ((object) $profiles as $profile)
            $profile = get_object_vars($profile);
            $profile['profile_picture'] = Storage::url($profile['profile_picture']);
            $results[] = $profile;
        }
        return response()->json(['result'=>  $results],200);
    }
}
