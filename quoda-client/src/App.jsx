import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import PesquisarCNPJ from './pages/PesquisarCNPJ';


function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'pesquisar':
        return <PesquisarCNPJ onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;