<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Space;
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'code'=>'required',
            'space_id'=>'required'
        ]);
        $data = $request->only(['name','code','space_id']);
        $task = Task::create($data);

        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['task'=>$task]]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Space $space,Task $task)
    {
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['task'=>$task]]);
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
    public function update(Space $space,Task $task,Request $request)
    {
        $this->validate($request,[
            'name'=>'required|max:255',
            'code'=>'required',
        ]);
        $data = $request->only(['name','code']);
        $task->update($data);
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['task'=>$task]]);
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
