// src/app/(admin)/admin/roles/page.jsx
"use client";

import { fetchPrivilegedUsers, updateUserRole, searchViewers, addAdminRole, sortUsersByRole } from "@/lib/adminAPI";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import debounce from "lodash.debounce";
import RolesList from "@/components/admin/roles/RolesList";
import Button from "@/components/elements/Button";
import Icons from "@/assets/icons";

export default function RolesManagementPage() {

  const { user } = useAuth();
  const [privilegedUsers, setPrivilegedUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const MIN_SEARCH_LENGTH = 4;

  useEffect(() => {
    loadUsers();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length >= MIN_SEARCH_LENGTH) {
        try {
          setSearching(true);
          setError(null);
          const data = await searchViewers(query);
          setSearchResults(data.users);
        } catch (err) {
          setError(err.message);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= MIN_SEARCH_LENGTH) {
      debouncedSearch(query);
    } else if (query.length === 0) {
      setSearchResults([]);
    }
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchPrivilegedUsers();
      setPrivilegedUsers(sortUsersByRole(data.users));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (userId) => {
    try {
      setUpdateInProgress(true);
      await addAdminRole(userId);
      await loadUsers();
      setSearchResults([]);
      setSearchQuery("");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdateInProgress(false);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      setUpdateInProgress(true);
      await updateUserRole(userId, "regular");
      await loadUsers();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdateInProgress(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try{
      setUpdateInProgress(true);
      await updateUserRole(userId, role);
      await loadUsers();
      setError(null);
    }catch(err){
      setError(err.message);
    } finally{
      setUpdateInProgress(false);
    }
  };
  
  if (!user || !["webmaster", "owner"].includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-apeRed">Access denied - Webmaster or Owner only</p>
      </div>
    );
  }

  return (
    <div className="roles-container">
      <div className="roles-header">
        <h2 className="roles-title apePeriod">Role Management</h2>
        <p className="roles-subtitle">Manage user roles and permissions</p>
      </div>

      <div className="roles-search-container">
        <div className="roles-search-input-wrapper">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={`Search users (minimum ${MIN_SEARCH_LENGTH} characters)...`}
              className="roles-search-input"
            />
            {searching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-apeRed"></div>
              </div>
            )}
          </div>
          {searchQuery && (
            <Button
              type="button"
              onClick={handleResetSearch}
              color="foreground"
              textColor="background"
              size="small"
              radius="md"
            >
              Reset
            </Button>
          )}
        </div>

        {searchQuery && searchQuery.length < MIN_SEARCH_LENGTH && (
          <p className="mt-2 pl-0.5 text-sm text-apeRed">
            Please enter at least {MIN_SEARCH_LENGTH} characters to search
          </p>
        )}

        {searchResults.length > 0 && (
          <div className="roles-search-results">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Search Results ({searchResults.length})
              </h3>
              <Button
                size="small"
                variant="text"
                color="foreground"
                onClick={handleResetSearch}
              >
                Clear Results
              </Button>
            </div>
            <div className="space-y-2">
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className="flex items-center justify-between p-2 rounded"
                >
                  <div>
                    <span className="font-medium">{result.name}</span>
                    <div className="text-sm text-gray-400">
                      {result.twitch?.username && `Twitch: ${result.twitch.username}`}
                      {result.kick?.username && ` • Kick: ${result.kick.username}`}
                    </div>
                  </div>
                  {result.role !== 'admin' && (
                    <Button
                      size="small"
                      onClick={() => handleAddAdmin(result._id)}
                      disabled={updateInProgress}
                    >
                      Make Admin
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery.length >= MIN_SEARCH_LENGTH && 
          !searching && 
          searchResults.length === 0 && (
            <p className="mt-4 text-center text-gray-400">
              No users found matching your search
            </p>
          )}
      </div>

      {error && (
        <div className="bg-apeRed/20 text-apeRed p-4 rounded mb-4">
          {error}
        </div>
      )}

      <RolesList
        users={privilegedUsers}
        user={user}
        loading={loading}
        error={error}
        updateInProgress={updateInProgress}
        onRemoveAdmin={handleRemoveAdmin}
        onRoleChange={handleRoleChange}
      />
    </div>
  );
}