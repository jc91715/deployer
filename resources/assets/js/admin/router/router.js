

import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes=[
    {
        path: '/admin', component: require('../components/home.vue') ,name: 'home',
        children: [
            {
                path: 'project',component: require('../components/home.vue'),
                children: [
                    { path: '',component: require('../components/project/index.vue') ,name: 'project.index' },
                    { path: 'create',component: require('../components/project/create.vue') ,name: 'project.create' },
                    { path: ':id/edit',component: require('../components/project/edit.vue',) ,name: 'project.edit' ,props: true}
                ]
            }
        ]
    },

];

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router