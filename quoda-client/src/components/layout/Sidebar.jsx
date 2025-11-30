import { LayoutDashboard, PieChart, Settings, LogOut, Search } from 'lucide-react';

const Sidebar = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: Search, label: "Pesquisar CNPJ", page: "pesquisar" },
    { icon: Settings, label: "Configurações", page: "configuracoes" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Quoda
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate && onNavigate(item.page)}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
              currentPage === item.page
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon size={20} className="mr-3" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;