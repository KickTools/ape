// src/components/admin/events/EventModal.jsx
"use client";

import Modal from "@/components/elements/Modal";

export default function EventModal({
  isOpen,
  onClose,
  selectedEvent,
  formData,
  setFormData,
  handleSubmit,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="modal-title text-xl font-semibold">
          {selectedEvent ? "Edit Event" : "Create New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="modal-form space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 bg-background-300/5 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-background-300/5 rounded-lg"
              rows="3"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full px-3 py-2 bg-background-300/5 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                End Date (Optional)
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-background-300/5 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-3 py-2 bg-background-300/5 rounded-lg"
              required
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Link (Optional)
            </label>
            <input
              type="text"
              value={formData.href}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, href: e.target.value }))
              }
              className="w-full px-3 py-2 bg-background-300/5 rounded-lg"
              placeholder="e.g., /events/your-event"
            />
          </div>
          <div className="modal-actions flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="modal-button cancel-button px-4 py-2 bg-background-300/20 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-button submit-button px-4 py-2 bg-apeRed rounded-lg text-white"
            >
              {selectedEvent ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}