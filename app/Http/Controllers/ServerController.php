<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Server;
class ServerController extends Controller
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
            'content'=>'required',
            'space_id'=>'required'
        ]);
        $data = $request->only(['name','content','space_id']);
        $server = Server::create($data);

        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['server'=>$server]]);
    }


    public function show($space,$server)
    {
        $server = Server::find($server);
        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['server'=>$server]]);
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
    public function update($space,$server,Request $request)
    {
        $this->validate($request,[
            'name'=>'required|max:255',
            'content'=>'required'
        ]);
        $data = $request->only(['name','content']);
        $server = Server::find($server);
        $server->update($data);

        return response()->json(['errorCode'=>0,'errorMsg'=>'ok','data'=>['server'=>$server]]);
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
