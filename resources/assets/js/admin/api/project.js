export default {
    store:({space_id,name,env,server_id,task_ids,repository,...params })=>{
        return axios.post(Laravel.adminRouter('projects.store',{space:space_id}),{space_id,name,env,server_id,task_ids,repository,...params })
    },
    update:({space_id,project_id,name,env,server_id,task_ids,repository,...params })=>{
        return axios.put(Laravel.adminRouter('projects.update',{space:space_id,project:project_id}),{name,env,server_id,task_ids,repository,...params })
    },
    show:({space,project_id,...params})=>{
        return axios.get(Laravel.adminRouter('projects.show',{space,project:project_id,...params}))
    }
}