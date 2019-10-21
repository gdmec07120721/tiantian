import Index from '@/views/Index.vue';

const routes = {
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/articleAdd',
      name: 'articleAdd',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/ArticleAdd.vue'),
      meta: { title: '添加', requiresAuth: true, login: true }
    },
    {
      path: '/article/:id',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Article.vue'),
      meta: { requiresAuth: true, login: false }
    },
    {
      path: '/articleEdit/:id',
      name: 'articleEdit',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/ArticleEdit.vue'),
      meta: { title: '编辑', requiresAuth: true, login: true }
    },
    {
      path: '/adAdd/:id',
      name: 'adAdd',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/AdAdd.vue'),
      meta: { title: '添加名片', requiresAuth: true, login: true }
    },
    {
      path: '/keysMake',
      name: 'keysMake',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/KeysMake.vue'),
      meta: { title: '', requiresAuth: true, login: true }
    },
    {
      path: '/data',
      name: 'data',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Data.vue'),
      meta: { title: '数据', requiresAuth: true, login: true }
    },
    {
      path: '/client',
      name: 'client',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Client.vue'),
      meta: { title: '客户', requiresAuth: true, login: true }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
    }
  ]
};

export default routes;