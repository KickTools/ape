// src/components/settings/SecuritySettings.jsx
export default function SecuritySettings({ user }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Security Settings</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground-700">Change Password</label>
            <input type="password" placeholder="New Password" className="mt-1 block w-full rounded-md border-foreground-700 bg-background-300 border-2 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground-700">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" className="mt-1 block w-full rounded-md border-foreground-700 bg-background-300 border-2 px-3 py-2" />
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 rounded-md bg-apeRed text-white hover:bg-red-600 transition-colors">Update Password</button>
          </div>
        </form>
      </div>
    );
  }