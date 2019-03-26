<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeploymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deployments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned();
//            $table->integer('number')->unsigned();
//            $table->string('task');
            $table->string('stage')->default('')->comment('分支名字');
            $table->tinyInteger('status')->unsigned()->nullable()->comment('进行到哪一步，记录部署状态');
            $table->text('message')->nullable()->comment('shell console')->comment('部署信息');
            $table->integer('user_id')->unsigned()->comment('提交工单用户ID');

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deployments');
    }
}
