<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Route;
use Illuminate\Filesystem\Filesystem;
use App\Notification;
use App\Activity;
use App\Enroll;
use App\Product;
use App\Order;
use App\User;
use App\SystemNotification;

class FrontRoute extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:home:route:js';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '生成route.js';

    protected $filesystem;

    /**
     * Create a new command instance.
     */
    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->generateRoutes();

    }

    public function generateMaps()
    {
        $map = [];
        $classes = [Notification::class,Activity::class,Enroll::class,Product::class,Order::class,SystemNotification::class,User::class];
        foreach ($classes as $class){
            $ref = new \ReflectionClass($class);
            $className = $ref->getShortName();
            $constants = $ref->getConstants();
            $staticProperties = $ref->getStaticProperties();
            $onlyMapsProperties = [];
            foreach ($staticProperties as $key=>$v){
                if(str_contains($key,'Maps')){
                    $onlyMapsProperties[$key] = $v;
                }
            }
            $map[$className]= array_merge($constants,$onlyMapsProperties);
        }
        $this->writeJsFile('const',$map);
    }
    protected function generateRoutes()
    {
        $routes = Route::getRoutes();

        $map = [];
        foreach ($routes as $route) {
            if (!$route->getName()) {
                continue;
            }
            if(!str_contains($route->getName(),'api.admin')) continue;

            $map[$route->getName()] = ltrim($route->uri(), '/');
        }

        $this->writeJsFile('route.const', $map);
    }


    protected function writeJsFile($filename, $data)
    {
        $this->isDirectory($path = resource_path('assets/js/admin'));
        $path = resource_path(sprintf('assets/js/admin/%s.js', $filename));
        $content = sprintf('module.exports = %s;', json_encode($data));
        file_put_contents($path, $content);
    }

    public function isDirectory($path)
    {
        if (!$this->filesystem->isDirectory($path)) {
            $this->filesystem->makeDirectory($path);
        }
    }
}
