import React from 'react';
import NavBar from "./common/NavBar/NavBar";

const Layout = ({children}) => {
    return (
        <>
            <NavBar/>
            <main>{children}</main>
        </>
    );
};

export default Layout;