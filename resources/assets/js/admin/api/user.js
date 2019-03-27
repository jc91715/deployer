export default {
    attemptLogin:({username,password})=>{
        return axios.post('oauth/token',{
            grant_type: "password",
            client_id: "2",
            client_secret: "khSMMkbUclhrDIrgqM6BU3atPUUyi0y3xZ2TwzZb",
            username:username,
            password: password,
            type: ''
        })
    },
    loadUserData(){
        return axios.get('api/user')
    }
}