<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{
    const STATUS_ZERO = 0;
    const STATUS_ONE = 1;
    const STATUS_TWO = 2;
    const STATUS_THREE = 3;

    public static $stausMaps = [
        self::STATUS_ZERO =>'未部署',
        self::STATUS_ONE =>'部署中',
        self::STATUS_TWO =>'部署失败',
        self::STATUS_THREE =>'部署成功',
    ];
    protected $fillable = ['stage','status','message','deploy_statue','hash','user_id'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
