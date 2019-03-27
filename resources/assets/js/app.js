
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    data:{
       message:''
    },
    methods:{
      getDeployment(){
          var time =setInterval(()=>{
              axios.get('deployment').then(res=>{
                  this.message = res.data.data.deployment.message
              })
          },2000)

      }
    },
    created(){
        this.getDeployment()
    }
});
