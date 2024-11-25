import React from 'react';
import { Bell, BellOff, Volume2, VolumeX } from 'lucide-react';

interface SettingsPanelProps {
  alertEnabled: boolean;
  soundEnabled: boolean;
  onAlertToggle: (enabled: boolean) => void;
  onSoundToggle: (enabled: boolean) => void;
}

export default function SettingsPanel({ 
  alertEnabled, 
  soundEnabled,
  onAlertToggle, 
  onSoundToggle 
}: SettingsPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">System Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {alertEnabled ? (
              <Bell className="w-6 h-6 text-blue-600" />
            ) : (
              <BellOff className="w-6 h-6 text-gray-400" />
            )}
            <span className="text-gray-700">Trap Full Alerts</span>
          </div>
          
          <button
            onClick={() => onAlertToggle(!alertEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              alertEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                alertEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {soundEnabled ? (
              <Volume2 className="w-6 h-6 text-blue-600" />
            ) : (
              <VolumeX className="w-6 h-6 text-gray-400" />
            )}
            <span className="text-gray-700">Sound Emitter</span>
          </div>
          
          <button
            onClick={() => onSoundToggle(!soundEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              soundEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}