import server from '../../api/server'
import project from "../../api/project";

export default {
    state: {
        item: {},
        list: []
    },
    actions: {

        async serverStore({ commit, state }, { space_id,name,content }) {
              await server.store({space_id,name,content})
        },
        async serverUpdate({ commit, state }, { space_id,server_id,name,content }) {
            await server.update({space_id,server_id,name,content})
        },
        async serverShow({ commit, state }, { space,server_id,...params }) {
            const {data} = await  server.show({space,server_id,...params})
            return data
        },
    },
    mutations: {

        SET_SERVER_ITEM: (state, item) => {
            state.item = item
        },
    },
    getters: {

    }
}