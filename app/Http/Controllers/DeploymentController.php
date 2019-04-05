<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Space;
use App\Models\Project;
use App\Models\Deployment;
use App\Services\Deployment\DeployCommanderInterface;
class DeploymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Space $space,Project $project)
    {
        $deployments = $project->deployments;
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['deployments'=>$deployments,'space'=>$space,'project'=>$project]]);
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
    public function store(Request $request,DeployCommanderInterface $deployCommander)
    {

//        return response()->json(['errorCode'=>0,'errorMsg'=>'ok']);
        $this->validate($request,[
            'project_id'=>'required|exists:projects,id',
            'stage'=>'required|max:255',
            'hash'=>'required|max:255'
        ]);
        $project = Project::find($request->input('project_id'));
        $data = $request->only(['stage','hash']);
        $data['user_id'] = $request->user()->id;
        $data['status'] = 0;
        $deployment = $project->deployments()->create($data);


        $deployCommander->deploy($deployment);
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['deployment'=>$deployment]]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($space,$project,$deployment)
    {

        $deployment = Deployment::find($deployment);
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['deployment'=>$deployment]]);
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
