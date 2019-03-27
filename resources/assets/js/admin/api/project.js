export default {
    index:({sort_by = 'created_at',order ='desc',...params})=>{
        return axios.get('/api/posts',{
            params:{
                sort_by,
                order,
                ...params
            }
        })
    }
}