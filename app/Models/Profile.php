<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function owner() {
        return $this->belongsTo('App\Models\User','user_id');
    }
    public function followers () {
        return $this->hasMany('App\Models\Follower');

    }
}
