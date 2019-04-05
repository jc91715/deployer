<template>
    <div class="">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="项目列表" name="first">
                <el-button type="text" @click="to_projects_create()">新建项目<i class="el-icon-plus"></i></el-button>
                <el-table
                        :data="projects"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="项目名称"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="repository"
                            label="仓库地址"
                            >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            >
                        <template slot-scope="scope">
                            <el-button @click="showDeployments(scope.row)" type="text" size="small">发布</el-button>
                            <el-button @click="projectEdit(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="服务器列表" name="second">
                <el-button type="text" @click="to_servers_create()">新建服务器<i class="el-icon-plus"></i></el-button>

                <el-table
                        :data="servers"

                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="服务器名称"
                           >
                    </el-table-column>
                    <el-table-column

                            label="服务器配置"
                            >
                        <template slot-scope="scope">
                            <pre>
                                <code>{{scope.row.content}}</code>
                            </pre>

                        </template>
                    </el-table-column>
                    <el-table-column

                            label="操作"
                            >
                        <template slot-scope="scope">
                            <el-button type="text" @click="showConfig(scope.row.content)" size="small">查看配置</el-button>
                            <el-button @click="serverEdit(scope.row)" type="text" size="small" >编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="任务列表" name="third">
                <el-button type="text" @click="to_tasks_create()">新建任务<i class="el-icon-plus"></i></el-button>
                <el-table
                        :data="tasks"

                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="任务名称"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="任务代码"
                          >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="showConfig(scope.row.code)" size="small">查看配置</el-button>
                            <el-button @click="taskEdit(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <el-dialog
                title="配置"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <pre>
                <code>
                    {{desc}}
                </code>
            </pre>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;desc=''">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;desc = ''">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '@/store'
    export default {
        name: "Show",
        props:['id'],
        data(){
            return {
                dialogVisible: false,
                activeName: 'first',
                desc:''
            }
        },
        computed:{
            list: () => store.state.space.item,
            projects:()=> store.state.space.item.projects,
            servers:()=>store.state.space.item.servers,
            tasks:()=> store.state.space.item.tasks,

        },
        watch: {
            // '$route' (to, from) {
            //     this.$router.go(0);
            // }
        },
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            showConfig(desc){
                this.desc = desc
                this.dialogVisible = true
            },
            handleClick(tab, event) {
                console.log(tab,event)
            },
            projectEdit(row){
                this.$router.push({name:'projects.edit',params:{id:this.id,project_id:row.id}})
            },
            serverEdit(row){
                this.$router.push({name:'servers.edit',params:{id:this.id,server_id:row.id}})
            },
            taskEdit(row){
                console.log(row)
                this.$router.push({name:'tasks.edit',params:{id:this.id,task_id:row.id}})
            },
            showDeployments(row){
                this.$router.push({name:'projects.deployments',params:{id:this.id,project_id:row.id}})
            },
            to_projects_create(){
                this.$router.push({name:'projects.create',params:{id:this.id}})
            },
            to_servers_create(){
                this.$router.push({name:'servers.create',params:{id:this.id}})
            },
            to_tasks_create(){
                this.$router.push({name:'tasks.create',params:{id:this.id}})
            }
        },
         beforeRouteEnter (to, from, next) {
            // 等待模型数据加载完毕,才继续进行vue组件的生命周期

            next(vm=>{
                if(to.query.activeName){
                    vm.activeName = to.query.activeName
                }
            })
        },
        async created(){
            await store.dispatch('spaceShow',{id:this.id})
        }
    }
</script>

<style scoped>

</style>