// src/app/(admin)/admin/events/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  archiveEvent,
} from "@/lib/eventAPI";
import Icons from "@/assets/icons";
import Button from "@/components/elements/Button";
import EventModal from "@/components/admin/events/EventModal";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    endDate: "",
    href: "#",
    status: "upcoming",
  });

  useEffect(() => {
    fetchEvents();
  }, [filterStatus]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await getAllEvents(filterStatus);
      if (response.success) {
        setEvents(response.events);
      }
    } catch (error) {
      toast.error("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        name: event.name,
        description: event.description,
        date: new Date(event.date).toISOString().split("T")[0],
        endDate: event.endDate
          ? new Date(event.endDate).toISOString().split("T")[0]
          : "",
        href: event.href,
        status: event.status,
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        name: "",
        description: "",
        date: "",
        endDate: "",
        href: "#",
        status: "upcoming",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData({
      name: "",
      description: "",
      date: "",
      endDate: "",
      href: "#",
      status: "upcoming",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEvent) {
        const response = await updateEvent(selectedEvent._id, formData);
        if (response.success) {
          toast.success("Event updated successfully");
          fetchEvents();
        }
      } else {
        const response = await createEvent(formData);
        if (response.success) {
          toast.success("Event created successfully");
          fetchEvents();
        }
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || "Failed to save event");
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await deleteEvent(eventId);
        if (response.success) {
          toast.success("Event deleted successfully");
          fetchEvents();
        }
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  const handleArchive = async (eventId) => {
    try {
      const response = await archiveEvent(eventId);
      if (response.success) {
        toast.success("Event archived successfully");
        fetchEvents();
      }
    } catch (error) {
      toast.error("Failed to archive event");
    }
  };

  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "upcoming":
        return `${baseClasses} bg-apeBlue-900 text-apeBlue`;
      case "ongoing":
        return `${baseClasses} bg-apeGreen-900 text-apeGreen`;
      case "completed":
        return `${baseClasses} bg-apeYellow-900 text-apeYellow`;
      case "cancelled":
        return `${baseClasses} bg-apeRed-900 text-apeRed`;
      case "archived":
        return `${baseClasses} bg-foreground-900 text-foreground-600`;
      default:
        return `${baseClasses} bg-foreground-900 text-foreground`;
    }
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h2 className="events-title apePeriod">Event Management</h2>
        <p className="events-subtitle">Create and manage community events</p>
      </div>

      <div className="events-filters-container">
        <div className="events-filters-wrapper">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="events-filter-select"
          >
            <option value="">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="archived">Archived</option>
          </select>

          <Button onClick={() => handleOpenModal()} size="small" radius="md">
            Create New Event
          </Button>
        </div>
      </div>

      <div className="events-table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th className="events-table-th">Name</th>
              <th className="events-table-th">Date</th>
              <th className="events-table-th">Status</th>
              <th className="events-table-th">Created By</th>
              <th className="events-table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="events-table-td">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-apeRed"></div>
                  </div>
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="events-table-td text-center text-foreground-600"
                >
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id}>
                  <td className="events-table-td">{event.name}</td>
                  <td className="events-table-td">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="events-table-td">
                    <span
                      className={`status-badge ${getStatusBadgeClass(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="events-table-td">{event.createdBy?.name}</td>
                  <td className="events-table-td text-right">
                    <div className="events-actions">
                      <button
                        onClick={() => handleOpenModal(event)}
                        className="action-button edit-button cursor-pointer"
                        title="Edit"
                      >
                        <Icons.Pencil size="2xl" />
                      </button>
                      <button
                        onClick={() => handleArchive(event._id)}
                        className="action-button archive-button cursor-pointer"
                        title="Archive"
                      >
                        <Icons.Archive size="2xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="action-button delete-button cursor-pointer"
                        title="Delete"
                      >
                        <Icons.Trash size="2xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedEvent={selectedEvent}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}