<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    protected $fillable = ['name','server_id','space_id','repository','env'];

    public function tasks()
    {
        return $this->belongsToMany(Task::class,'project_tasks');
    }
    public function deployments()
    {
        return $this->hasMany(Deployment::class);
    }
    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    public function syncTasks(array $data)
    {
        foreach ($data as $i => $taskId) {
            $syncTaskIds[$taskId] = ['task_order' => $i + 1];
        }

        return $this->tasks()->sync($syncTaskIds);
    }

    public function updateDeployment($tmp)
    {

    }
}
