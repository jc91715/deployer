import Home from '../views/Home.vue'
var index =[
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: 'login',
                name: 'login',
                component: ()=>import('../views/Login.vue')
            },
            {
                path: 'projects',
                component: ()=>import('../views/Container.vue'),
                children: [
                    {
                        path: '',
                        component: ()=>import('../views/project/Index.vue'),
                        name: 'project',
                    }
                ]
            },
        ]
    },

]
export default index