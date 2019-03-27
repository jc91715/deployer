import Vue from 'vue'
import Router from 'vue-router'
import localforage from 'localforage'
import index from './router/index'
import store from './store'
Vue.use(Router)

export const   router = new Router({
    routes: index
})
router.beforeEach((to, from, next) => {

    // 获取 JWT Token
    const publicPages = ['/login','/','/projects'];
    const authRequired = !publicPages.includes(to.path);
    const jwtToken = localforage.getItem('token');
    if(to.name!=='login'){
        store.commit('SET_INTEND',to.fullPath)
    }
    if (authRequired && !jwtToken) {
        return next('/login');
    }

    next();
});