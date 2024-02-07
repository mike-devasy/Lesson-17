import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from '@/views/LoginPage.vue';
import ContactsPage from '@/views/ContactsPage.vue';
// import EditNoteView from '@/views/EditNoteView.vue';
import store from '@/store'
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
		meta:{
			requireAuth:true
		}
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
			meta:{
				requireAuth:true
			},
  },

	{
    path: "/contacts",
    name: "contacts",
    component: ContactsPage,
		meta:{
			requireAuth:false
		},
  },
	{
    path: "/login",
    name: "login",
    component: LoginPage,
		meta:{
			requireAuth:false
		},
  },
	{
    path: "/config/:id?",
    name: "config",
    component: () => import('@/views/EditNoteView.vue'),
		meta:{
			requireAuth:false
		},
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to) => {
	if (to.meta?.requireAuth) {
			let isAuthenticated = store.state.auth.user

			if (!isAuthenticated) isAuthenticated = await store.dispatch('auth/loginWithCredential')

			if (!isAuthenticated)
					return {
							name: 'login',
					}
	}
})
export default router;
