import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Briefcase } from 'lucide-react';

// Components
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import BarChartDist from '../components/charts/BarChartDist';
import PieChartCnae from '../components/charts/PieChartCnae';

// API Services
import { estabelecimentosAPI, cnaesAPI } from '../services/api';

const Dashboard = ({ onNavigate }) => {
  // Estados de filtros
  const [filterUf, setFilterUf] = useState('Todos');
  const [filterCnae, setFilterCnae] = useState('Todos');
  
  // Estados de dados
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [cnaes, setCnaes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar estabelecimentos e CNAEs em paralelo
        const [estabelecimentosResponse, cnaesResponse] = await Promise.all([
          estabelecimentosAPI.getAll({ limit: 100000 }), // Aumentado para pegar todos
          cnaesAPI.getAll({ limit: 2000 })       // Aumentado para pegar todos os CNAEs
        ]);
        
        setEstabelecimentos(estabelecimentosResponse.data || []);
        setCnaes(cnaesResponse.data || []);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Processamento de Dados
  const filteredData = useMemo(() => {
    return estabelecimentos.filter(item => {
      const matchUf = filterUf === 'Todos' || item.uf === filterUf;
      const matchCnae = filterCnae === 'Todos' || item.cnae_principal_codigo === filterCnae;
      return matchUf && matchCnae;
    });
  }, [estabelecimentos, filterUf, filterCnae]);

  const dataByUf = useMemo(() => {
    const acc = filteredData.reduce((obj, item) => {
      obj[item.uf] = (obj[item.uf] || 0) + 1;
      return obj;
    }, {});
    return Object.keys(acc).map(key => ({ name: key, empresas: acc[key] })).sort((a, b) => b.empresas - a.empresas);
  }, [filteredData]);

  const dataByCnae = useMemo(() => {
    const acc = filteredData.reduce((obj, item) => {
      const cnae = item.cnae_principal_codigo || 'Sem CNAE';
      const descricao = item.cnae_descricao || cnae;
      // Usar a descrição como chave para agrupar
      obj[descricao] = (obj[descricao] || 0) + 1;
      return obj;
    }, {});
    return Object.keys(acc).map(key => ({ name: key, value: acc[key] })).sort((a, b) => b.value - a.value);
  }, [filteredData]);

  // Obter opções únicas dos dados reais
  const uniqueUfs = useMemo(() => {
    return ['Todos', ...new Set(estabelecimentos.map(e => e.uf).filter(Boolean))];
  }, [estabelecimentos]);

  const uniqueCnaes = useMemo(() => {
    return ['Todos', ...new Set(estabelecimentos.map(e => e.cnae_principal_codigo).filter(Boolean))];
  }, [estabelecimentos]);

  const ufOptions = uniqueUfs.map(uf => ({ value: uf, label: uf }));
  const cnaeOptions = uniqueCnaes.map(cnae => ({ value: cnae, label: cnae }));

  // Estados de loading e erro
  if (loading) {
    return (
      <MainLayout currentPage="dashboard" onNavigate={onNavigate}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout currentPage="dashboard" onNavigate={onNavigate}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Erro ao carregar dados</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout currentPage="dashboard" onNavigate={onNavigate}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard Comercial</h2>
          <p className="text-gray-500 mt-1">Visão geral de oportunidades por região.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select 
            options={ufOptions} 
            value={filterUf} 
            onChange={(e) => setFilterUf(e.target.value)}
            placeholder="Selecione o Estado"
          />
          <Select 
            options={cnaeOptions} 
            value={filterCnae} 
            onChange={(e) => setFilterCnae(e.target.value)}
            placeholder="Selecione o Setor"
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard label="Total Empresas" value={filteredData.length} color="blue" />
        <KPICard label="Estados Ativos" value={Object.keys(dataByUf).length} color="purple" />
        <KPICard label="Setores" value={Object.keys(dataByCnae).length} color="green" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-[400px]">
          <CardHeader title="Distribuição Geográfica" subtitle="Empresas por Estado (UF)" />
          <div className="h-[300px] w-full">
            <BarChartDist data={dataByUf} />
          </div>
        </Card>

        <Card className="h-[400px]">
          <CardHeader title="Market Share" subtitle="Distribuição por Setor (CNAE)" />
          <div className="h-[300px] w-full">
            <PieChartCnae data={dataByCnae} />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

// Sub-componente simples apenas para uso local
const KPICard = ({ label, value, color }) => {
  const colors = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500'
  };
  
  return (
    <Card className={`border-l-4 ${colors[color] || 'border-gray-500'}`}>
      <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
    </Card>
  );
};

export default Dashboard;