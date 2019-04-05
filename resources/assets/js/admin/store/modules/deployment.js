import deployment from '../../api/deployment'


export default {
    state: {
        item: {},
        list: []
    },
    actions: {
        async deploymentFetch({ commit, state }, { ...params }) {
            // 对axios和api进行了简单的封装,使api请求更加语义化
            const {data} = await deployment.index({...params})

            // action只能通过提交commit来修改state,具体原因请查看vuex文档 (其实我也忘了为啥 (╯﹏╰))
            commit('SET_DEPLOYMENT_LIST', data.data.deployments)
            commit('SET_PROJECT_ITEM', data.data.project)
            commit('SET_SPACE_ITEM', data.data.space)
        },

        async deploymentShow({ commit, state }, { space,project,deployment_id,...params }) {
            const {data} =  await deployment.show({space,project,deployment_id,...params})
            return data
        },
        async deploymentStore({ commit, state }, {space, project_id,stage,hash,...params }) {

           const {data} =  await  deployment.store({space,project_id,stage,hash,...params})
            return data
        },
    },
    mutations: {
        SET_DEPLOYMENT_LIST: (state, item) => {
            state.list = item
        },
        SET_DEPLOYMENT_ITEM: (state, item) => {
            state.item = item
        },
    },
    getters: {

    }
}