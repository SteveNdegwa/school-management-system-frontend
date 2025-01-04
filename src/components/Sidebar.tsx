import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem"
import Navbar from "./Navbar";
import { store } from "../store";

interface props {
    children: React.ReactNode,
}

export default function Sidebar({children}: props){
    const navigate = useNavigate()

    useEffect(()=>{
        if (store.getState().token == ""){
            navigate("/login")
        }
    })
    return (
        <>
        <Navbar/>
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <MenuItem name="Dashboard" link="" />
                <MenuItem name="Books" link="" />
                <MenuItem name="Users" link="" />
            </ul>
        </div>
        </aside>

        <div className="p-4 sm:ml-64 bg-white overflow-y-auto pt-20 dark:bg-gray-800 min-h-screen">
            {children}
        </div>
        </>
    );
};