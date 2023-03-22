import React from 'react';
const Home = React.lazy(() => import('../pages/frontend/Home'));
const Hardware = React.lazy(() => import('../pages/frontend/Hardware'));
const Login = React.lazy(() => import("../pages/sign-in/MatLogin"));
const Community = React.lazy(()=> import('../pages/frontend/Community'));
const Documentation = React.lazy(() => import("../pages/frontend/Documents"));
const BlogDetails = React.lazy(()=>import("../pages/frontend/BlogDetails"));
const DocDetails = React.lazy(()=>import("../pages/frontend/DocumentationDetails"))
const routes = [
    { path: '/home',index:true ,exact: true, name: 'Home', component: Home, children:[
    { path: '/hardware',index:false, exact: true, name: 'Hardware', component: Hardware },
    { path: '/community',index:false, exact: true, name: 'Community', component: Community },
    {path: '/documentation',index:false,exact:true,name:'Documentation',component: Documentation },
    {path: '/blog/details/1',index:false,exact:true,name:'BlogDetails',component: BlogDetails },
   

] },
    // { path: '/home/hardware',index:false, exact: true, name: 'Hardware', component: Hardware },
    // { path: '/home/login', exact: true, name: 'Login', component: Login },
]

export default routes