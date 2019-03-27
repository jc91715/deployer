<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use Symfony\Component\Process\Process;

class Deploy implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $deployment;

    protected $executable;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Model $deployment)
    {
        $this->deployment = $deployment;
        $this->executable = base_path('vendor/bin/dep');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $deployment = $this->deployment;
        $project    = $deployment->project;
        $server     = $project->server;

        $app = app();

        // Create a server list file
        $serverListFileBuilder = $app->make('App\Services\Deployment\DeployerServerListFileBuilder')
            ->setServer($server)
            ->setProject($project);

        $serverListFile = $app->make('App\Services\Deployment\DeployerFileDirector', ['fileBuilder'=>$serverListFileBuilder])->construct();


        // Create recipe files
        foreach ($project->tasks as $i => $task) {
            // HACK: If an instance of DeployerRecipeFileBuilder class is not stored in an array, a destructor is called and a recipe file is deleted immediately.
            $taskFileBuilders[] = $app->make('App\Services\Deployment\DeployerTaskFileBuilder')->setTask($task);
            $taskFiles[] = $app->make('App\Services\Deployment\DeployerFileDirector', ['fileBuilder'=>$taskFileBuilders[$i]])->construct();
        }

        // Create a deployment file
        $deploymentFileBuilder = $app->make('App\Services\Deployment\DeployerDeploymentFileBuilder')
            ->setProject($project)
            ->setServerListFile($serverListFile)
            ->setTaskFile($taskFiles);
        $deploymentFile = $app->make('App\Services\Deployment\DeployerFileDirector', ['fileBuilder'=>$deploymentFileBuilder])->construct();

        $commond = [$this->executable,"-f={$deploymentFile->getFullPath()}",'--ansi','-n','-vv','deploy',$deployment->stage,"--revision={$deployment->hash}"];
        $process = new Process($commond);

        $process->setTimeout(3600);//总超时
//        $process->setIdleTimeout(60);//上一次output 被进程输出的时间

        $tmp['message'] = '';
        $process->run(function ($type, $buffer)use(&$tmp,$deployment) {
            $tmp['message'] .= $buffer;
            $deployment->update($tmp);
        });

//        if ($process->isSuccessful()) {
//            $message = $process->getOutput();
//        } else {
//            $message = $process->getErrorOutput();
//        }
        $data['status']  = $process->getExitCode();

        $deployment->update($data);

    }
}
