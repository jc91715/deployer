export default {

    store:({space_id,name,content})=>{
        return axios.post(Laravel.adminRouter('servers.store',{space:space_id}),{space_id,name,content})
    },
    update:({space_id,server_id,name,content})=>{
        return axios.put(Laravel.adminRouter('servers.update',{space:space_id,server:server_id}),{space_id,name,content})
    },
    show:({space,server_id,...params})=>{
        return axios.get(Laravel.adminRouter('servers.show',{space,server:server_id,...params}))
    }
}