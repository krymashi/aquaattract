import React, { useState, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import TrapSensor from './TrapSensor';

interface MonitoringProps {
  alertEnabled: boolean;
  soundEnabled: boolean;
}

export default function Monitoring({ alertEnabled, soundEnabled }: MonitoringProps) {
  const [frequency, setFrequency] = useState(0);
  const [trapCount, setTrapCount] = useState(0);
  const [trapStatus, setTrapStatus] = useState<'empty' | 'full'>('empty');
  const MAX_TRAP_LIMIT = 15;
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (trapCount < MAX_TRAP_LIMIT) {
        setTrapCount(prev => prev + 1);
      }
    }, 5000); // Increment every 5 seconds

    return () => clearInterval(timer);
  }, [trapCount]);

  useEffect(() => {
    if (trapStatus === 'full' && alertEnabled) {
      alert('Trap is full!');
    }
  }, [trapStatus, alertEnabled]);

  useEffect(() => {
    if (soundEnabled && frequency > 0) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }

      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillatorRef.current.connect(audioContextRef.current.destination);
      oscillatorRef.current.start();
    } else if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
    };
  }, [frequency, soundEnabled]);

  return (
    <div className="space-y-6">
      {soundEnabled && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-medium">Frequency Control</h2>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
              Soundwave Frequency: {frequency} Hz
            </label>
            <input
              type="range"
              id="frequency"
              min="0"
              max="5000"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0 Hz</span>
              <span>5000 Hz</span>
            </div>
          </div>
        </div>
      )}

      <TrapSensor
        count={trapCount}
        maxLimit={MAX_TRAP_LIMIT}
        onStatusChange={setTrapStatus}
      />
    </div>
  );
}