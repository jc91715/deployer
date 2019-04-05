export default {
    index:({sort_by = 'created_at',order ='desc',...params})=>{
        return axios.get(Laravel.adminRouter('spaces.index'),{
            params:{
                sort_by,
                order,
                ...params
            }
        })
    },
    store:({name,desc})=>{
        return axios.post(Laravel.adminRouter('spaces.store'),{name,desc})
    },
    show:({id})=>{
        return axios.get(Laravel.adminRouter('spaces.show',{space:id}))
    }
}