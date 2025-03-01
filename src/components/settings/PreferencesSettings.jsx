// src/components/settings/PreferencesSettings.jsx
export default function PreferencesSettings({ user }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Preferences Settings</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground-700">Theme</label>
            <select className="mt-1 block w-full rounded-md border-foreground-700 bg-background-300 border-2 px-3 py-2">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground-700">Language</label>
            <select className="mt-1 block w-full rounded-md border-foreground-700 bg-background-300 border-2 px-3 py-2">
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>
          <div>
            <button type="submit" className="w-full py-2 px-4 rounded-md bg-apeRed text-white hover:bg-red-600 transition-colors">Save Preferences</button>
          </div>
        </form>
      </div>
    );
  }