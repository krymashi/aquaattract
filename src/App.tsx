import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LoadingProgress from './components/LoadingProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <LoadingProgress onComplete={() => setIsLoading(false)} />
  ) : (
    <Dashboard />
  );
}

export default App;