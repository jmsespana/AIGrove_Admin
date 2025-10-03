import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase/client'
import Dashboard from '../pages/Dashboard.vue'
import Users from '../pages/Users.vue'
import Species from '../pages/Species.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  { 
    path: '/', 
    name: 'Dashboard', 
    component: Dashboard, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/users', 
    name: 'Users', 
    component: Users, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/species', 
    name: 'Species', 
    component: Species, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to protect routes
router.beforeEach(async (to, from, next) => {
  // Check if route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  
  // Get current session
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session

  if (requiresAuth && !isAuthenticated) {
    // Route requires auth but user is not logged in
    // Redirect to login page
    next({
      path: '/login',
      query: { redirect: to.fullPath } // Save the intended destination
    })
  } else if (requiresGuest && isAuthenticated) {
    // User is logged in but trying to access login page
    // Redirect to dashboard
    next('/')
  } else {
    // Everything is fine, proceed
    next()
  }
})

export default router