// src/app/(admin)/admin/users/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchViewersList } from "@/lib/viewerDataAPI";
import SearchFilterSection from "@/components/admin/UserLookup/SearchFilterSection";
import UserProfileCard from "@/components/admin/UserLookup/UserProfileCard";
import UserList from "@/components/admin/UserLookup/UserList";
import Pagination from "@/components/admin/UserLookup/Pagination";
import apeDefaultPfp from "@/assets/images/ape-pfp_default.png";
import Modal from "@/components/elements/Modal";

export default function UserLookupPage() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "" });
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadUsers = async (searchFilters) => {
    if (!user || !["admin", "webmaster"].includes(user.role)) return;
    try {
      setLoading(true);
      const result = await fetchViewersList(searchFilters);
      
      if (result.viewers && Array.isArray(result.viewers)) {
        const mappedUsers = result.viewers.map(viewer => ({
          id: viewer._id,
          username: viewer.name || "Unknown",
          kickName: viewer.kick?.username || "N/A",
          twitchName: viewer.twitch?.username || "N/A",
          // Format the date here
          createdAt: viewer.createdAt ? new Date(viewer.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : "N/A",
          level: 3,
          profileImage: viewer.twitch?.profile?.twitch?.profile_image_url || 
                        viewer.kick?.profile?.kick?.profile_pic || 
                        apeDefaultPfp
        }));
        
        setUsers(mappedUsers);
        setPagination({
          currentPage: result.pagination.currentPage,
          totalPages: result.pagination.totalPages
        });
      } else {
        console.error("Invalid viewers data format:", result);
        setUsers([]);
      }
      setInitialLoadComplete(true);
    } catch (error) {
      console.error("Failed to load viewers:", error);
      setUsers([]);
      setInitialLoadComplete(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(filters);
  }, [user, filters]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open modal
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleSearch = (search) => {
    return new Promise((resolve, reject) => {
      setFilters(prev => ({ ...prev, search, page: 1 }));
      loadUsers({ ...filters, search, page: 1 })
        .then(resolve)
        .catch(reject);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  if (!user || !["admin", "webmaster"].includes(user.role)) {
    return <p className="text-center">Access denied - Admin or Webmaster only</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-16 md:py-32 px-8">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-wide uppercase apePeriod">
          Lookup
        </h2>
        <p className="text-lg text-foreground-600">
          Search and view user profiles
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 lg:w-1/6">
          <SearchFilterSection 
            onSearch={handleSearch} 
            initialSearch={filters.search}
          />
        </div>

        <div className="w-full md:w-3/4 lg:w-5/6">
          {loading && !initialLoadComplete ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading users...</p>
            </div>
          ) : users.length > 0 ? (
            <>
              <UserList users={users} onUserSelect={handleUserSelect} />
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-center text-apeRed py-8 bg-apeRed/20 rounded">No users found. Try a different search term.</p>
          )}
        </div>
      </div>
           {/* Modal */}
           <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedUser && <UserProfileCard user={selectedUser} />}
      </Modal>
    </div>
  );
}