export default {

    store:({space_id,name,code,...params})=>{
        return axios.post(Laravel.adminRouter('tasks.store',{space:space_id}),{space_id,name,code,...params})
    },
    update:({space_id,task_id,name,code})=>{
        return axios.put(Laravel.adminRouter('tasks.update',{space:space_id,task:task_id}),{space_id,name,code})
    },
    show:({space,task_id,...params})=>{
        return axios.get(Laravel.adminRouter('tasks.show',{space,task:task_id,...params}))
    }

}