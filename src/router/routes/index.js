// import { pages } from "@/config";
// import { guardGuest, guardAuth, userRole } from "@/utils/auth";

/** default import **/
import DefaultContainer from "@/components/DefaultContainer.vue";

/** dynamic & async import **/
const Signin = () =>
  import(/* webpackChunkName: 'p-auth_signin' */ "@/pages/auth/Signin.vue");
const Register = () =>
  import(/* webpackChunkName: 'p-auth_register' */ "@/pages/auth/Register.vue");
const Dashboard = () =>
  import(
    /* webpackChunkName: 'p-dashboard */ "@/pages/dashboard/Dashboard.vue"
  );
const User = () =>
   import(/* webpackChunkName: 'p-User */ "@/pages/user/User.vue");
const UserDetail = () =>
  import(
    /* webpackChunkName: 'p-user-detail */ "@/pages/user/UserDetail.vue"
  );
const UserCreate = () =>
  import(
    /* webpackChunkName: 'p-user-create */ "@/pages/user/UserCreate.vue"
  );
const UserEdit = () =>
  import(
    /* webpackChunkName: 'p-user-edit */ "@/pages/user/UserEdit.vue"
  );
const Role = () =>
  import(/* webpackChunkName: 'p-role */ "@/pages/role/Role.vue");
const RoleDetail = () =>
  import(
    /* webpackChunkName: 'p-role-detail */ "@/pages/role/RoleDetail.vue"
  );
const RoleCreate = () =>
  import(
    /* webpackChunkName: 'p-role-create */ "@/pages/role/RoleCreate.vue"
  );
const RoleEdit = () => 
  import(
    /* webpackChunkName: 'p-role-edit */ "@/pages/role/RoleEdit.vue"
  );
const Profile = () =>
  import(/* webpackChunkName: 'p-profile */ "@/pages/profile/Profile.vue");



const RouterView = () =>
  import(/* webpackChunkName: 'c-router-view */ "@/components/RouterView.vue");

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true,
      title: 'Dashboard',
    },
  },
];

const userRoutes = [
  {
    path: '/users',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'Users',
        component: User,
        meta: {
          auth: true,
          title: 'Users',
        },
      },
      {
        path: ':id/detail',
        name: 'UserDetail',
        component: UserDetail,
        meta: {
          auth: true,
          title: 'User Detail',
        },
      },
      {
        path: 'create',
        name: 'UserCreate',
        component: UserCreate,
        meta: {
          auth: true,
          title: 'User Create',
        },
      },
      {
        path: ':id/edit',
        name: 'UserEdit',
        component: UserEdit,
        meta: {
          auth: true,
          title: 'User Edit',
        },
      }
    ],
  },
]

const roleRoutes = [
  {
    path: '/roles',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'Roles',
        component: Role,
        meta: {
          auth: true,
          title: 'Roles',
        },
      },
      {
        path: ':id/detail',
        name: 'RoleDetail',
        component: RoleDetail,
        meta: {
          auth: true,
          title: 'Role Detail',
        },
      },
      {
        path: 'create',
        name: 'RoleCreate',
        component: RoleCreate,
        meta: {
          auth: true,
          title: 'Role Create',
        },
      },
      {
        path: ':id/edit',
        name: 'RoleEdit',
        component: RoleEdit,
        meta: {
          auth: true,
          title: 'Role Edit',
        },
      },
    ],
  }
]

const profileRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true,
      title: 'Profile',
    },
  },
];


/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  // Pages
  {
    path: '',
    name: 'Dashboard',
    component: DefaultContainer,
    redirect: '',
    children: [
      ...dashboardRoutes,
      ...userRoutes,
      ...roleRoutes,
      ...profileRoutes,
    ],
    // beforeEnter: guardAuth,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Signin,
    meta: {
      title: 'Login',
    }
    // beforeEnter: guardGuest,
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
    }
  }
];
