import Index from '@/views/Index.vue';

const routes = {
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/articleAdd',
      name: 'articleAdd',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/ArticleAdd.vue')
    },
    {
      path: '/article',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Article.vue')
    },
    {
      path: '/articlePreview',
      name: 'articlePreview',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/ArticlePreview.vue')
    },
    {
      path: '/adAdd',
      name: 'adAdd',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/AdAdd.vue')
    }
  ]
};

export default routes;