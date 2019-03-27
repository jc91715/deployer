import user from '../../api/user'
import localforage from 'localforage'

export default {
    state: {
       user:{},
       token:null
    },
    actions: {
        async attemptLogin({ commit, state }, payload) {
            // 对axios和api进行了简单的封装,使api请求更加语义化
            const {data} = await user.attemptLogin(payload)
            console.log(data)
            // action只能通过提交commit来修改state,具体原因请查看vuex文档 (其实我也忘了为啥 (╯﹏╰))
            localStorage.setItem('token',data.access_token)
            commit('SET_TOKEN', data.access_token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
            user.loadUserData().then(user =>{
                commit('SET_USER', user.data)
            }).catch(err=>{
                localStorage.removeItem('token')
                commit('SET_TOKEN', null)
                commit('SET_USER', {})
            })

        }
    },
    mutations: {
        SET_USER: (state, item) => {
            state.user = item
        },
        SET_TOKEN: (state, item) => {
            state.token = item
        },
    },
    getters: {

    }
}