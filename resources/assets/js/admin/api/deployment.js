export default {
    index:({...params})=>{
        return axios.get(Laravel.adminRouter('deployments.index',{...params}))
    },
    show:({space,project,deployment_id,...params})=>{

        return axios.get(Laravel.adminRouter('deployments.show',{space,project,deployment:deployment_id,...params}))
    },
    store:({space,project_id,stage,hash,...params })=>{

        return axios.post(Laravel.adminRouter('deployments.store',{space:space,project:project_id}),{project_id,stage,hash,...params })
    }
}