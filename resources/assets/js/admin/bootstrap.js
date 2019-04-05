window.Vue = require('vue');
window._ = require('lodash');
window.Bus = new Vue();
window.Laravel = {};
import './plugins/axios'
import './plugins/element'

window.$ = window.jQuery = require('jquery');
Laravel.router = require('./common/backend-router-generator')(require('./route.const'));
Laravel.adminRouter = require('./common/backend-router-generator')(require('./route.const'),'api.admin.');
