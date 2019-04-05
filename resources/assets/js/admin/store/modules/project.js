import project from '../../api/project'


export default {
    state: {
        item: {},
        list: []
    },
    actions: {
        async projectStore({ commit, state }, { space_id,name,env,server_id,task_ids,repository,...params }) {
            await project.store({space_id,name,env,server_id,task_ids,repository,...params})
        },
        async projectUpdate({ commit, state }, { space_id,project_id,name,env,server_id,task_ids,repository,...params }) {
            await project.update({space_id,project_id,name,env,server_id,task_ids,repository,...params})
        },
        async projectShow({ commit, state }, { space,project_id,...params }) {
            const {data} = await  project.show({space,project_id,...params})
            return data
        },
    },
    mutations: {

        SET_PROJECT_ITEM: (state, item) => {
            state.item = item
        },
    },
    getters: {
        getProjectList: (state) => state.list
    }
}