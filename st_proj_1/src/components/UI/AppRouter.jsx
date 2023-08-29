import React, {useContext} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import About from "../../pages/About";
import Posts from "../../pages/Posts";
import Error from "../../pages/Error";
import PostIdPages from "../../pages/PostIdPages";
import {publicRoutes, privateRoutes} from "../../router/Router";
import {AuthContext} from "../../context";
import Loader from "./Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
      return <Loader />
    }

    return (
        isAuth
            ?
            <Routes>
                {
                    privateRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                            key={route.path}
                        />
                    )
                }
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                            key={route.path}
                        />
                    )
                }
            </Routes>
    );

};

export default AppRouter;