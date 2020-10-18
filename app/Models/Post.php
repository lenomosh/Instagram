<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function save_post(){
        $this->save();
    }
    public function update_caption(string $caption){
        $this->caption = $caption;
        $this->save();
    }
    public function  delete_post(){
        $this->delete();

    }
}
