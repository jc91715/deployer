export default {
    state: {
        intend: '/',
    },
    actions: {

    },
    mutations: {
        SET_INTEND: (state, item) => {
            state.intend = item
        }
    },
    getters: {
        getBaseIntend: (state) => state.intend
    }
}