<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Space extends Model
{

    protected $fillable = ['name','desc'];

    public static function boot()
    {
        parent::boot();
        static::creating(function($model){
            $model->rand_code = getRandomString();
        });
    }
}
