import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'

import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Profile from '../views/Profile.vue'
import Categories from '../views/Categories.vue'
import Profiles from '../views/Profiles.vue'
import ProfilesList from '../views/ProfilesList.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from '../views/Checkout.vue'
import Success from '../views/Success.vue'
import CommentForm from '../views/CommentForm.vue'
import PostForm from '../views/PostForm.vue'
import ProductForm from '../views/ProductForm.vue'
import OrderForm from '../views/OrderForm.vue'
import MessageForm from '../views/MessageForm.vue'
import ProfileSales from '../views/ProfileSales.vue'
import ProfileOrders from '../views/ProfileOrders.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'Product',
    component: Product
  },
  {
    path: '/:category_slug',
    name: 'Category',
    component: Category
  },
  {
    path: '/profiles/:profile_slug',
    name: 'Profile',
    component: Profile
  },
  
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/profiles',
    name: 'Profiles',
    component: Profiles
  },
  {
    path: '/profiles/list',
    name: 'ProfilesList',
    component: ProfilesList
  },
  {
    path: '/comment-form',
    name: 'CommentForm',
    component: CommentForm
  },
  {
    path: '/post-form',
    name: 'PostForm',
    component: PostForm
  },
  {
    path: '/product-form',
    name: 'ProductForm',
    component: ProductForm
  },
  {
    path: '/order-form',
    name: 'OrderForm',
    component: OrderForm
  },
  {
    path: '/message-form/:recip_slug',
    name: 'MessageForm',
    component: MessageForm
  },
  {
    path: '/profiles/:profile_slug/sales',
    name: 'ProfileSales',  
    component: ProfileSales
  },
  {
    path: '/profiles/:profile_slug/orders',
    name: 'ProfileOrders',  
    component: ProfileOrders
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
