import App from "./App";
import LandingPage from "./components/marketing/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";

const routes = [
    {
        path: '/',
        name: 'home',
        component: LandingPage
    },
    {
        path: '/todo',
        name: 'todo',
        component: App,
        meta: {//Check if Auth
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
        meta: {//check if User is Guest
            requiresVisitor: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
];

export default routes