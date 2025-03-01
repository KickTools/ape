// src/components/settings/NotificationsSettings.jsx
export default function NotificationsSettings({ user }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Notifications Settings</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground-700">Email Notifications</label>
            <input type="checkbox" className="mr-2" /> Enable
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground-700">Push Notifications</label>
            <input type="checkbox" className="mr-2" /> Enable
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 rounded-md bg-apeRed text-white hover:bg-red-600 transition-colors">Save Notifications</button>
          </div>
        </form>
      </div>
    );
  }