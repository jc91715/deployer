<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\Deploy;
use App\Models\Deployment;
use Symfony\Component\Process\Process;
class DeployCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:project';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    protected $executable;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->executable = base_path('vendor/bin/dep');
        $deployment = Deployment::find(1);
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

        $command = [$this->executable,"-f={$deploymentFile->getFullPath()}",'--ansi','-n','-vv','deploy',$deployment->stage,"--revision={$deployment->hash}"];
        $process = new Process($command);

        $process->setTimeout(3600);//总超时
//        $process->setIdleTimeout(60);//上一次output 被进程输出的时间

        $tmp['message'] = '';
        $process->run(function ($type, $buffer)use(&$tmp,$deployment) {
            $tmp['message'] .= $buffer;
            $deployment->update($tmp);
        });

        if ($process->isSuccessful()) {
            $data['statue']  = 3;
//            $message = $process->getOutput();

        } else {
            $data['statue']  = 2;
//            $message = $process->getErrorOutput();
        }
        $data['deploy_statue']  = $process->getExitCode();

        $deployment->update($data);
    }
}
