import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../components/AboutView.vue'
import ResetView from '../components/Reset.vue'
import ProfilView from '../components/ProfilView.vue'
import Nav from '../components/Nav.vue'
import AddPoll from '../components/AddPoll.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetView
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView
    },
    {
      path: '/nav',
      name: 'nav',
      component: Nav
    },
    {
      path: '/add',
      name: 'add',
      component: AddPoll
    }
  ]
})

// router.beforeEach((to,from,next)=>{
//   const publicPages = ('/');
//   const authRequired = !publicPages.includes(to.path);
//   const access_token = localStorage.getItem('access_token');
//   const isAuthenticated = access_token != null;

//   if(authRequired && !isAuthenticated) {
//     next('/');
//   }else if(to.path === '/' && isAuthenticated){
//     next('/about');
//   }else{
//     next();
//   }
// })

export default router
