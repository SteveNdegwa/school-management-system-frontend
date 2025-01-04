import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../config/api";
import { Table } from "../components/Table";
import { row } from "../components/Table";

export interface user {
    id: string,
    username: string,
    id_no: string,
    reg_no: string,
    school_id: string,
    classroom_name: string,
    classroom_id: string,
    role_name: string,
    email: string,
    phone_number: string,
    other_phone_number: string,
    first_name: string,
    last_name: string,
    other_name: string,
    gender: string,
    state_name: string,
}

export function Students(){

    const [rows, setRows] = useState<row[]>([])
    const [rowsSet, setRowsSet] = useState<boolean>(false)

    useEffect(()=>{
        if (!rowsSet){
            api
                .post("/users/filter-users/", {role_name: "SuperAdmin", school_id:"757459e1-7b35-44ee-8509-e15ae8b58162"})
                .then((response)=>{
                    if (response.data.code == "100.000.000"){
                        let data: row[] = [];
                        let users: user[] = response.data.data
                        console.log(users)
                        users.map((user)=>{
                            data.push({
                                name: `${user.first_name} ${user.last_name}`,
                                data: [user.username, user.role_name, "jsuahs"],
                                link: `/users/${user.username}`,
                            })
                        })
                        setRows(data)
                        setRowsSet(true)
                    }
                    else{
                        console.log(response)
                    }
                })
                .catch((err)=> {
                    console.log("This is the error", err)})
        }
    })

    let columns = ["name", "username", "role", "classroom", "link"]


    return (
        <Sidebar>
            <Table rows={rows} columns={columns}/>
        </Sidebar>
    )
}