import React from 'react';
import AssetList from './components/AssetList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="lg:text-3xl text-xl font-semibold text-center">Digital Assets Dashboard</h1>
      </header>
      <main className="bg-gray-100 min-h-screen p-4">
        <AssetList />
      </main>
    </div>
  );
};

export default App;
