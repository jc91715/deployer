import space from '../../api/space'

export default {
    state: {
        item: {},
        list: []
    },
    actions: {
        async spaceFetch({ commit, state }, { ...params }) {
            // 对axios和api进行了简单的封装,使api请求更加语义化
            const {data} = await space.index({...params})

            // action只能通过提交commit来修改state,具体原因请查看vuex文档 (其实我也忘了为啥 (╯﹏╰))
            commit('SET_SPACE_LIST', data.data.spaces)
        },
        async spaceStore({ commit, state }, { name,desc }) {
              await space.store({name,desc})
        },
        async spaceShow({ commit, state }, { id }) {
            const {data} =  await space.show({id})
            commit('SET_SPACE_ITEM', data.data.space)
        }
    },
    mutations: {
        SET_SPACE_LIST: (state, item) => {
            state.list = item
        },
        SET_SPACE_ITEM: (state, item) => {
            state.item = item
        },
    },
    getters: {

    }
}