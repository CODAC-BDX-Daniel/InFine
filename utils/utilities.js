import {checkCookies, getCookie, getCookies} from 'cookies-next';
import role from "../component/auth/role";

//Function which checks if token stored in coockie
export const getUserToken = () => {
    const token = getCookie('access_token');
    if (token) {
        console.log('USER CONNECTED')
        return token;
    } else {
        console.log('NO USER CONNECTED');
        return false;
    }
}


//Function checking user connected and user admin

export const checkIfAdmin = (router) => {
    //check if access token stored in cookie
    const userToken = checkCookies("access_token");
    //if no token -> then redirect to home
    if (!userToken) {
        router.push('/');
        return;
    }
    //if token stored in cookie -> then check if role is admin
    const userRole = role(getCookies('access_token'))
    //Check if user role is not admin -> then redirect to home
    if (userRole !== "admin") {
        alert("Espace Interdit");
        router.push("/");
        return;
    }
}