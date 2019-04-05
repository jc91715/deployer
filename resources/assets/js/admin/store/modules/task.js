import task from '../../api/task'


export default {
    state: {
        item: {},
        list: []
    },
    actions: {

        async taskStore({ commit, state }, { space_id,name,code ,...params}) {
              await task.store({space_id,name,code,...params})
        },
        async taskUpdate({ commit, state }, { space_id,task_id,name,code }) {
            await task.update({space_id,task_id,name,code})
        },
        async taskShow({ commit, state }, { space,task_id,...params }) {
            const {data} = await  task.show({space,task_id,...params})
            return data
        },
    },
    mutations: {

        SET_TASK_ITEM: (state, item) => {
            state.item = item
        },
    },
    getters: {

    }
}