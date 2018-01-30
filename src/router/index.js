import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Article.vue'], resolve)
                },
                {
                    path: '/article',
                    component: resolve => require(['../components/page/Article.vue'], resolve)
                },
                {
                    name: 'category',
                    path: '/category',
                    component: resolve => require(['../components/page/category/Category.vue'], resolve)
                },
                {
                    name: 'edit_category',
                    path: '/edit_category',
                    component: resolve => require(['../components/page/category/CategoryForm.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
