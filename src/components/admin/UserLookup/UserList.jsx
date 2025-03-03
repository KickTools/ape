// src/components/admin/UserLookup/UserList.jsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function UserList({ users, onUserSelect }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleRowClick = (user) => {
    setSelectedUserId(user.id === selectedUserId ? null : user.id); // Toggle selection
    onUserSelect(user);
  };

  return (
    <div className="userList">
      {users.map((user) => (
        <div
          key={user.id}
          className={`userList-row ${
            user.id === selectedUserId ? "userList-row-selected" : ""
          }`}
          onClick={() => handleRowClick(user)}
        >
          <Image
            src={user.profileImage}
            alt={user.username}
            width={48}
            height={48}
            className="userList-pfp"
          />
          <div className="flex flex-grow justify-between">
            <div className="flex flex-col">
              <span>{user.kickName}</span>
              <span>{user.twitchName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-right">{"★".repeat(user.level)}</span>
              <span>{user.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}