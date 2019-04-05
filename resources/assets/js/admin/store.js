import Vue from 'vue'
import Vuex from 'vuex'

import project from './store/modules/project'
import deployment from './store/modules/deployment'
import user from './store/modules/user'
import space from './store/modules/space'
import server from './store/modules/server'
import task from './store/modules/task'
import base from './store/base'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        project,
        user,
        space,
        server,
        task,
        deployment,
        base
    }
})