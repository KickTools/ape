// src/lib/adminAPI.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ADMIN_ROUTE = "/admin";

/**
 * Fetches all users with elevated privileges (admin, webmaster, owner)
 * @returns {Promise<{success: boolean, users: Array}>}
 */
export const fetchPrivilegedUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}${ADMIN_ROUTE}/privileged-users`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching privileged users:', error);
        throw new Error('Failed to fetch privileged users');
    }
};

/**
 * Updates a user's role
 * @param {string} userId - The ID of the user to update
 * @param {string} role - The new role to assign ('admin', 'webmaster', 'regular')
 * @returns {Promise<{success: boolean, message: string, user: Object}>}
 */
export const updateUserRole = async (userId, role) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ADMIN_ROUTE}/update-role/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};

/**
 * Checks if the current user has permission to modify roles
 * @param {string} currentUserRole - The role of the current user
 * @param {string} targetUserRole - The role of the user being modified
 * @returns {boolean}
 */
export const canModifyRole = (currentUserRole, targetUserRole) => {
    if (currentUserRole === 'owner') return true;
    if (currentUserRole === 'webmaster') {
        return !['owner', 'webmaster'].includes(targetUserRole);
    }
    return false;
};

/**
 * Gets the available role options based on the current user's role
 * @param {string} currentUserRole - The role of the current user
 * @returns {Array<{value: string, label: string}>}
 */
export const getAvailableRoles = (currentUserRole) => {
    const roles = [];

    if (currentUserRole === 'owner') {
        roles.push(
            { value: 'webmaster', label: 'Webmaster' },
            { value: 'admin', label: 'Admin' },
            { value: 'regular', label: 'Regular' }
        );
    } else if (currentUserRole === 'webmaster') {
        roles.push(
            { value: 'admin', label: 'Admin' },
            { value: 'regular', label: 'Regular' }
        );
    }

    return roles;
};

/**
 * Gets the CSS class for a role badge
 * @param {string} role - The role to get the class for
 * @returns {string} CSS class names
 */
export const getRoleBadgeClass = (role) => {
    const baseClasses = 'px-2 py-1 rounded text-sm font-medium';

    switch (role) {
        case 'owner':
            return `${baseClasses} bg-apeRed-900 text-apeRed`;
        case 'webmaster':
            return `${baseClasses} bg-apeBlue-900 text-apeBlue`;
        case 'admin':
            return `${baseClasses} bg-apeGreen-900 text-apeGreen`;
        default:
            return `${baseClasses} bg-foreground-900 text-foreground`;
    }
};

export const searchViewers = async (searchQuery) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ADMIN_ROUTE}/search-viewers?q=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching viewers:', error);
        throw new Error('Failed to search viewers');
    }
};

export const addAdminRole = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ADMIN_ROUTE}/update-role/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'admin' })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding admin role:', error);
        throw error;
    }
};

/**
 * Format date to local string
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Sort users by role hierarchy
 * @param {Array} users - Array of user objects
 * @returns {Array} Sorted array of users
 */
export const sortUsersByRole = (users) => {
    const roleOrder = {
        'owner': 1,
        'webmaster': 2,
        'admin': 3,
        'regular': 4
    };

    return [...users].sort((a, b) => {
        if (roleOrder[a.role] !== roleOrder[b.role]) {
            return roleOrder[a.role] - roleOrder[b.role];
        }
        // If roles are the same, sort by name
        return a.name.localeCompare(b.name);
    });
};