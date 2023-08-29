import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPages from "../pages/PostIdPages";
import React from "react";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: 'about', component: <About />, exact: true},
    {path: '/posts/:id', component: <PostIdPages/>, exact: true},
    {path: '/posts', component: <Posts/>, exact: true},
    {path: '*', component: <Posts/>, exact: true},
]

export const publicRoutes = [
    {path: 'login', component: <Login />, exact: true},
    {path: '*', component: <Login />, exact: true},

]