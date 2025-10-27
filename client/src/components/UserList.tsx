import React, { useEffect, useState } from "react";
import { User } from "../model";
import UserCard from "./UserCard";
import NavBar from "./NavBar";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token: string = localStorage.getItem("token") || "";

  useEffect(() => {
    try {
      fetch("http://localhost:5000/users/userlist", {
        headers: { Authorization: token },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.log(err.message));
    } catch (err) {
      console.error("ERROR FETCHING USERS");
    }
  }, []);

    return (
    <div className="flex flex-col min-h-screen bg-forest-50 text-forest-100">
        <NavBar />
        <main
        className="
            flex flex-col items-center justify-start
            flex-1
            bg-gradient-to-b from-forest-50 via-forest-100 to-onyx
            px-6 pt-10 pb-6 space-y-5
            text-forest-200
        "
        >
        {/* Page Header */}
        <h2 className="text-2xl font-semibold tracking-widest text-forest-700 mb-4">
            Wanderers of the Swamp
        </h2>

        {/* No users message */}
        {users.length === 0 ? (
            <p className="text-forest-700 italic">No wanderers found...</p>
        ) : (
            <div
            className="
                w-full max-w-3xl flex flex-col items-center gap-3
                bg-forest-50 border border-forest-100 rounded-md
                shadow-inner shadow-forest-950/40 backdrop-blur-sm p-6
            "
            >
            {users.map((user) => (
                <UserCard key={user.id} data={user} />
            ))}
            </div>
        )}
        </main>
    </div>
    );
};

export default UserList;