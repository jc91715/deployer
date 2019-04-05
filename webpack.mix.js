// let mix = require('laravel-mix');
//
// /*
//  |--------------------------------------------------------------------------
//  | Mix Asset Management
//  |--------------------------------------------------------------------------
//  |
//  | Mix provides a clean, fluent API for defining some Webpack build steps
//  | for your Laravel application. By default, we are compiling the Sass
//  | file for the application as well as bundling up all the JS files.
//  |
//  */
//
// mix.js('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

const mix = require('laravel-mix')
const HtmlWebpackPlugin = require('html-webpack-plugin');


mix.webpackConfig({
    plugins: [
        new HtmlWebpackPlugin({
            template: 'resources/assets/js/admin/index.html',
            filename: 'index.html'
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': __dirname + '/resources/assets/js/admin'
        },
    },
});
mix.config.webpackConfig.output = {
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/build/admin/'
};

mix.version()
mix.js('resources/assets/js/admin/bootstrap.js', 'js/bootstrap.js')
    .js('resources/assets/js/admin/app.js', 'js/admin.js')
    .autoload({
        jquery: ['$', 'window.jQuery', 'jQuery']
    })
    .sass('resources/assets/sass/admin.scss', 'css') // 打包后台css
    .extract(['vue', 'vue-router', 'axios','jquery','lodash']) // 提取依赖库
    .setResourceRoot('/build/admin/') // 设置资源目录
    .setPublicPath('./public/build/admin') // 设置 mix-manifest.json 目录

