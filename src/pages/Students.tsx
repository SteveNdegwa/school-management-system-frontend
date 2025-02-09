import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { row } from "../components/Table";
import ApiManager from "../ApiManager/ApiManager";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import Searchbar from "../components/Searchbar";

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
};

export function Students(){
    const schoolId = useSelector((state:any) => state.user?.school_id);
    const [tableRows, setTableRows] = useState<row[]>([]);
    let tableColumns = ["", "Name", "Username", "Role", "Classroom", "Link"];

    useEffect(()=>{
        const fetchData = async () => {
            const users: any = await ApiManager.filterUsers({"role_name": "SuperAdmin", "school_id": schoolId});
            mapUsers(users.data);
          }
          fetchData()
            .catch(console.error);
    }, []);

    const mapUsers = (users: user[]) => {
        let count = 0;
        let data: row[] = [];
        users.map((user: user) =>{
            count += 1;
            data.push({
                count: count,
                name: `${user.first_name} ${user.last_name}`,
                data: [user.username, user.role_name, user.classroom_name],
                link: `/users/${user.username}`,
            });
        });
        setTableRows(data);
    }

    return (
        <Layout>
            <Searchbar target={"users"} additionalFilters={{role_name: "SuperAdmin", "school_id": schoolId}} onSearch={mapUsers}/>
            <Table rows={tableRows} columns={tableColumns}/>
        </Layout>
    );
};