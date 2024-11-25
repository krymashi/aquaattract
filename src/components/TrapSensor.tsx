import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface TrapSensorProps {
  count: number;
  maxLimit: number;
  onStatusChange: (status: 'empty' | 'full') => void;
}

export default function TrapSensor({ count, maxLimit, onStatusChange }: TrapSensorProps) {
  const percentage = (count / maxLimit) * 100;
  const status = count === 0 ? 'empty' : count >= maxLimit ? 'full' : 'partial';

  React.useEffect(() => {
    onStatusChange(count >= maxLimit ? 'full' : 'empty');
  }, [count, maxLimit, onStatusChange]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Trap Status</span>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {count} / {maxLimit}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              status === 'empty' 
                ? 'bg-red-100 text-red-700 border-2 border-red-500'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Empty
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              status === 'full'
                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Full
          </button>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                status === 'full' ? 'bg-green-500' :
                status === 'empty' ? 'bg-red-500' : 'bg-blue-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          {status === 'full' && (
            <div className="flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-lg">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Trap is full!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}