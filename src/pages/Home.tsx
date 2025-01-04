import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import api from "../config/api";
import { store, setUserData } from "../store";
import Sidebar from "../components/Sidebar";

export function Home(){
    const [user, setUser] = useState<{ [key: string]: string; } | null>(null);

    let dispatch = useDispatch()

    useEffect(() => {
        if (store.getState().user == null){
            api
                .post("/users/get-user/", {user_id: store.getState().userId})
                .then((response) => {
                    if (response.data.code == "100.000.000"){
                        setUser(response.data.data)
                    }else{
                        // setError(response.data.error)
                    }
                })
                .catch((err) => console.log(""));
        }else{
            setUser(store.getState().user)
        }
    })
    if (user){
        dispatch(setUserData(user))
    }

    return (
        <div>
            <Sidebar>
                <h1>Home</h1>
            </Sidebar>
        </div>
    );
}