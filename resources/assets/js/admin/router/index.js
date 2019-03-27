import Home from '../views/Home.vue'
var index =[
    {
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/login',
        name: 'login',
        component: ()=>import('../views/Login.vue')
    },
    {
        path: '/projects',
        name: 'project',
        component: ()=>import('../views/Home.vue'),
        children: [
            {
                path: '',
                component: require('../views/project/Index.vue'),
            }
        ]
    },
]
export default index