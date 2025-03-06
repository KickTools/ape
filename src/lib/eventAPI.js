// src/lib/eventAPI.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const EVENT_ROUTE = "/events";

/**
 * Create a new event
 * @param {Object} eventData - The event data
 * @returns {Promise<{success: boolean, message: string, event: Object}>}
 */
export const createEvent = async (eventData) => {
    try {
        const response = await fetch(`${API_BASE_URL}${EVENT_ROUTE}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

/**
 * Fetch all events
 * @param {string} status - Optional status filter
 * @returns {Promise<{success: boolean, events: Array}>}
 */
export const getAllEvents = async (status = '') => {
    try {
        const query = status ? `?status=${status}` : '';
        const response = await fetch(`${API_BASE_URL}${EVENT_ROUTE}${query}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

/**
 * Update an event
 * @param {string} eventId - The ID of the event to update
 * @param {Object} updateData - The data to update
 * @returns {Promise<{success: boolean, message: string, event: Object}>}
 */
export const updateEvent = async (eventId, updateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}${EVENT_ROUTE}/${eventId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

/**
 * Delete an event
 * @param {string} eventId - The ID of the event to delete
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${EVENT_ROUTE}/${eventId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

/**
 * Archive an event
 * @param {string} eventId - The ID of the event to archive
 * @returns {Promise<{success: boolean, message: string, event: Object}>}
 */
export const archiveEvent = async (eventId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${EVENT_ROUTE}/${eventId}/archive`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error archiving event:', error);
        throw error;
    }
};

export const getPublicEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}${EVENT_ROUTE}/public`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching public events:', error);
        throw error;
    }
};