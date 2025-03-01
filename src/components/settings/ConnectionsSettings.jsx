// src/components/settings/ConnectionsSettings.jsx
export default function ConnectionsSettings({ user }) {
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Connections Settings</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-0.5 text-foreground-700">X Connection</label>
            <button className="w-full py-2 px-4 rounded-md bg-background text-foreground hover:bg-foreground hover:text-background transition-colors">Connect X</button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-0.5 text-foreground-700">Discord Connection</label>
            <button className="w-full py-2 px-4 rounded-md bg-discord text-white hover:bg-green-600 transition-colors">Connect Discord</button>
          </div>
        </form>
      </div>
    );
  }
  