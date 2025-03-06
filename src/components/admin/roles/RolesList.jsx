// src/components/admin/roles/RolesList.jsx
"use client";

import { useState } from "react";
import Button from "@/components/elements/Button";
import Icons from "@/assets/icons";
import {
  updateUserRole,
  canModifyRole,
  getAvailableRoles,
  getRoleBadgeClass,
  formatDate,
} from "@/lib/adminAPI";

export default function RolesList({ users, user, loading, error, updateInProgress, onRemoveAdmin, onRoleChange }) {
    if (loading) {
      return <div className="p-8 text-center">Loading...</div>;
    }
  
    if (error) {
      return <div className="bg-apeRed/20 text-apeRed p-4 rounded mb-4">{error}</div>;
    }
  
    if (!users || users.length === 0) {
      return <div className="p-8 text-center">No privileged users found</div>;
    }
  
    return (
      <div className="roles-table-container">
        <div className="roles-table-header">
          <h3 className="text-lg font-semibold uppercase apePeriod">Current Privileged Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="roles-table">
            <thead>
              <tr>
                <th className="roles-table-th">Name</th>
                <th className="roles-table-th">Platforms</th>
                <th className="roles-table-th">Current Role</th>
                <th className="roles-table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((privilegedUser) => (
                <tr key={privilegedUser._id}>
                  <td className="roles-table-td">
                    <div className="flex flex-col space-y-0.5">
                      <p>{privilegedUser.name}</p>
                      <p className="text-foreground-700">{formatDate(privilegedUser.createdAt)}</p>
                    </div>
                  </td>
                  <td className="roles-table-td">
                    <div className="flex flex-col space-y-0.5">
                      {privilegedUser.twitch?.username && (
                        <p className="roles-table-platform">
                          <Icons.BrandTwitch size="md" color="twitch" />
                          <span>{privilegedUser.twitch.username}</span>
                        </p>
                      )}
                      {privilegedUser.kick?.username && (
                        <p className="roles-table-platform">
                          <Icons.BrandKick size="md" color="kick" />
                          <span>{privilegedUser.kick.username}</span>
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="roles-table-td">
                    <span className={`role-badge role-badge-${privilegedUser.role}`}>
                      {privilegedUser.role}
                    </span>
                  </td>
                  <td className="roles-table-td text-right">
                    {canModifyRole(user.role, privilegedUser.role) && (
                      privilegedUser.role === "admin" ? (
                        <Button
                          size="small"
                          textColor="apeRed"
                          variant="text"
                          onClick={() => onRemoveAdmin(privilegedUser._id)}
                          disabled={updateInProgress}
                        >
                          Remove Admin
                        </Button>
                      ) : (
                        <select
                          className="roles-select"
                          value={privilegedUser.role}
                          onChange={(e) => onRoleChange(privilegedUser._id, e.target.value)}
                          disabled={updateInProgress}
                        >
                          {getAvailableRoles(user.role).map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }