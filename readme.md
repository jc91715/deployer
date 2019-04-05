## 基于deployer的web端自动部署

命令行端的[deployer](https://deployer.org/)是无状态，对于每一个项目想要查看发布的记录是一件很难受的一件事，因此有了此项目

## install
```
git clone https://github.com/jc91715/deployer project 
```
## composer 
```
cd project && composer install
```
## 配置数据库迁移
```
php artisan db:seed
```

## 访问 yourdomain.com 或者 yourdomain.com/build/admin/index.html

账户 admin@admin.com
密码 secret


### 前后端分离
后端
* Laravel 5.5
前端
* vue 2.6.6
使用laravel-mix 前端打包后的代码在public/build/admin 路径下。两种方式访问前端代码
* 1 yourdomain.com
* 2 yourdomain.com/build/admin/index.html
### 如何使用

#### 1新建空间
#### 2 新建服务器
配置格式
```
jc91715.top:
    host: 47.96.15.116
    user: root
    identity_file:
        public_key: ~/.ssh/id_rsa.pub
        private_key: ~/.ssh/id_rsa
    stage: master
    deploy_path: /var/www/sites/helloworld
jc91715.top:
    host: 47.96.15.116
    user: root
    identity_file:
        public_key: ~/.ssh/id_rsa.pub
        private_key: ~/.ssh/id_rsa
    stage: master
    deploy_path: /var/www/sites/helloworld
```
#### 3 新建任务
任务格式
```
 <?php  
require 'recipe/laravel.php';
```
```
task('chown:user', function() {

    run('cd {{deploy_path}}/../ && chown  ubuntu:www-data {{deploy_path}} -R');
});after('deploy:unlock', 'chown:user');
```
#### 4 新建项目
* 填写仓库名字
* 选择服务器
* 选择任务
* 填写配置文件
#### 5 发布
* 填写分支名字
* 填写分支hash
