import React from 'react';
import { Settings, Activity } from 'lucide-react';
import Monitoring from './Monitoring';
import SettingsPanel from './SettingsPanel';

export default function Dashboard() {
  const [alertEnabled, setAlertEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-blue-900">Aqua Attract</h1>
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Fish"
              className="w-16 h-16 rounded-full object-cover shadow-lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Monitoring</h2>
              </div>
              <Monitoring 
                alertEnabled={alertEnabled}
                soundEnabled={soundEnabled}
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Settings</h2>
              </div>
              <SettingsPanel
                alertEnabled={alertEnabled}
                soundEnabled={soundEnabled}
                onAlertToggle={setAlertEnabled}
                onSoundToggle={setSoundEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}