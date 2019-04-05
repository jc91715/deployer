import Home from '../views/backend/Home.vue'
var index =[
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: 'login',
                name: 'login',
                component: ()=>import('../views/backend/Login.vue')
            },
            {
                path: 'backend',
                component: ()=>import('../views/backend/Container.vue'),
                children: [
                    {
                        path: '',
                        component: ()=>import('../views/backend/Index.vue'),
                        name: 'backend',
                    },
                    {
                        path: 'spaces',
                        component: Home,
                        children: [
                            {
                                path: '',
                                component: ()=>import('../views/backend/space/Index.vue'),
                                name: 'spaces',
                            },
                            {
                                path: ':id',
                                component: ()=>import('../views/backend/space/Show.vue'),
                                name: 'spaces.show',
                                props:true,
                            },
                            {
                                path: ':id/projects',
                                component: Home,
                                props:true,
                                children:[
                                    {
                                        path: 'create',
                                        component: ()=>import('../views/backend/project/Create.vue'),
                                        name: 'projects.create',
                                        props:true
                                    },
                                    {
                                        path: ':project_id/edit',
                                        component: ()=>import('../views/backend/project/Edit.vue'),
                                        name: 'projects.edit',
                                        props:true
                                    },
                                    {
                                        path: ':project_id/deployments',
                                        component: ()=>import('../views/backend/deployment/Index.vue'),
                                        name: 'projects.deployments',
                                        props:true,
                                    },
                                    {
                                        path: ':project_id/deployments/:deployment_id',
                                        component: ()=>import('../views/backend/deployment/Show.vue'),
                                        name: 'projects.deployments.show',
                                        props:true,
                                    },
                                ]
                            },
                            {
                                path: ':id/servers',
                                component: Home,
                                props:true,
                                children:[
                                    {
                                        path: 'create',
                                        component: ()=>import('../views/backend/server/Create.vue'),
                                        name: 'servers.create',
                                        props:true
                                    },
                                    {
                                        path: ':server_id/edit',
                                        component: ()=>import('../views/backend/server/Edit.vue'),
                                        name: 'servers.edit',
                                        props:true
                                    },
                                ]
                            },
                            {
                                path: ':id/tasks',
                                component: Home,
                                props:true,
                                children:[
                                    {
                                        path: 'create',
                                        component: ()=>import('../views/backend/task/Create.vue'),
                                        name: 'tasks.create',
                                        props:true
                                    },
                                    {
                                        path: ':task_id/edit',
                                        component: ()=>import('../views/backend/task/Edit.vue'),
                                        name: 'tasks.edit',
                                        props:true
                                    },
                                ]
                            },

                        ]
                    },
                    {
                        path: 'projects',
                        component: Home,
                        children: [
                            {
                                path: '',
                                component: ()=>import('../views/backend/project/Index.vue'),
                                name: 'projects',
                            }
                        ]
                    },
                ]
            },

        ]
    },

]
export default index