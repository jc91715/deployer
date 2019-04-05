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

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function servers()
    {
        return $this->hasMany(Server::class);
    }

}
