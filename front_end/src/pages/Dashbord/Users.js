import axios from "axios";
import { useEffect } from "react";
import { baseURL ,USERS } from './../../API/Api';
import Cookie from 'cookie-universal';
import Logout from "../Auth/Logout";

export default function Users() {
    const cookie = Cookie();

    useEffect(() => {
        axios
        .get(`${baseURL}/${USERS}`, {
            headers: {
                Authorization: "Bearer" + cookie.get("e-commerce"),
            },
        })

        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }, []);
    return (
        <>
            {""}
            <h1>users page</h1>
            <Logout/>
        </>
    )
}