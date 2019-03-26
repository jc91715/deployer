<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{

    protected $fillable = ['stage','status','message'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
