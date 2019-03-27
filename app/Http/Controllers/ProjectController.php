<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Deployment;
use App\Services\Deployment\DeployCommanderInterface;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::get();
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['projects'=>$projects]]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'name'=>'required|max:255',
            'repository'=>'required',
            'space_id'=>'required',
            'server_id'=>'required',
            'task_ids'=>'required|array',
        ]);
        $data = $request->only(['name','server_id','space_id','repository']);
        $project = Project::create($data);
        $project->syncTasks($request->input('task_ids'));
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['project'=>$project]]);
    }
    public function deployment(Request $request,DeployCommanderInterface $deployCommander)
    {

        $this->validate($request,[
            'project_id'=>'required|exists:projects,id',
            'stage'=>'required|max:255',
            'hash'=>'required|max:255'
        ]);
        $project = Project::find($request->input('project_id'));
        $data = $request->only(['stage','hash']);
        $deployment = $project->deployments()->create($data);


        $deployCommander->deploy($deployment);
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['deployment'=>$deployment]]);
    }

    public function test()
    {
        return view('test');
    }
    public function getDeployment()
    {
        $deployment = Deployment::get();
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['deployment'=>$deployment]]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
