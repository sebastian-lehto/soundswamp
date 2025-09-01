import React, { useEffect, useState } from "react";
import { User } from "../model";
import './styles.css';
import UserCard from './UserCard';


const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const token: string = localStorage.getItem("token") || "";
    useEffect(() => {
        try {
            fetch('http://localhost:5000/users/userlist', {
                headers: { 'Authorization': token },
            })
                .then(res => res.json())
                .then(data => setUsers(data))
                .catch(err => console.log(err.message))
        } catch (err) {
            console.error("ERROR FETCHING USERS");
        }
    }, []);

    return (
        <div className="userlist">
            {users.map((user) => (
                <UserCard key={user.id} data={user} />
            ))}
        </div>
    );
}

export default UserList;