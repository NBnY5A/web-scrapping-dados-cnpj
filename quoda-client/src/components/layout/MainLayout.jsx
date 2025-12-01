import Sidebar from './Sidebar'; // Usando o Sidebar criado na resposta anterior

const MainLayout = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans antialiased">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1 ml-64 p-8 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;