export default {
    index:({sort_by = 'created_at',order ='desc',...params})=>{
        return axios.get(Laravel.adminRouter('projects.index'),{
            params:{
                sort_by,
                order,
                ...params
            }
        })
    }
}