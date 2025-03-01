// src/components/settings/AccountSettings.jsx
export default function AccountSettings({ user }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Account Settings</h3>
        <form className="space-y-4">
          {/* Your form content here */}
          <div>
            <label className="block text-sm font-medium text-foreground-700">Username</label>
            <input type="text" value={user.username} disabled className="mt-1 block w-full rounded-md border-foreground-700 bg-background-300 border-2 px-3 py-2" />
          </div>
          {/* ... other form fields */}
          <button type="submit" className="w-full py-2 px-4 rounded-md bg-apeRed text-white hover:bg-red-600 transition-colors">Save Changes</button>
        </form>
      </div>
    );
  }