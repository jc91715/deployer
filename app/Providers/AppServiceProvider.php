<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Deployment\QueueDeployCommander;
use App\Services\Deployment\DeployerFile;
use App\Services\Deployment\DeployerDeploymentFileBuilder;
use App\Services\Deployment\DeployerTaskFileBuilder;
use App\Services\Deployment\DeployerServerListFileBuilder;
use App\Services\Filesystem\LaravelFilesystem;
use Symfony\Component\Yaml\Parser;
use Symfony\Component\Yaml\Dumper;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

        $this->app->bind('App\Services\Deployment\DeployCommanderInterface', function ($app) {
            return new QueueDeployCommander(
                $app->make('Illuminate\Contracts\Bus\Dispatcher')
            );
        });


        $this->app->bind('App\Services\Deployment\DeployerServerListFileBuilder', function ($app) {
            return new DeployerServerListFileBuilder(
                new LaravelFilesystem($app['files']),
                new DeployerFile,
                new Parser,
                new Dumper
            );
        });
        $this->app->bind('App\Services\Deployment\DeployerTaskFileBuilder', function ($app) {
            return new DeployerTaskFileBuilder(
                new LaravelFilesystem($app['files']),
                new DeployerFile
            );
        });
        $this->app->bind('App\Services\Deployment\DeployerDeploymentFileBuilder', function ($app) {
            return new DeployerDeploymentFileBuilder(
                new LaravelFilesystem($app['files']),
                new DeployerFile
            );
        });
    }
}
