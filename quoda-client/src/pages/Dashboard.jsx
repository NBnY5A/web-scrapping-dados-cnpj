import React, { useState, useMemo } from 'react';
import { MapPin, Briefcase } from 'lucide-react';

// Components
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import BarChartDist from '../components/charts/BarChartDist';
import PieChartCnae from '../components/charts/PieChartCnae';

// Data
import { companyData } from '../data/mockData';

const Dashboard = () => {
  const [filterUf, setFilterUf] = useState('Todos');
  const [filterCnae, setFilterCnae] = useState('Todos');

  // Processamento de Dados
  const filteredData = useMemo(() => {
    return companyData.filter(item => {
      return (filterUf === 'Todos' || item.uf === filterUf) &&
             (filterCnae === 'Todos' || item.cnae === filterCnae);
    });
  }, [filterUf, filterCnae]);

  const dataByUf = useMemo(() => {
    const acc = filteredData.reduce((obj, item) => {
      obj[item.uf] = (obj[item.uf] || 0) + 1;
      return obj;
    }, {});
    return Object.keys(acc).map(key => ({ name: key, empresas: acc[key] })).sort((a, b) => b.empresas - a.empresas);
  }, [filteredData]);

  const dataByCnae = useMemo(() => {
    const acc = filteredData.reduce((obj, item) => {
      obj[item.cnae] = (obj[item.cnae] || 0) + 1;
      return obj;
    }, {});
    return Object.keys(acc).map(key => ({ name: key, value: acc[key] })).sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const uniqueUfs = ['Todos', ...new Set(companyData.map(d => d.uf))];
  const uniqueCnaes = ['Todos', ...new Set(companyData.map(d => d.cnae))];

  const ufOptions = uniqueUfs.map(uf => ({ value: uf, label: uf }));
  const cnaeOptions = uniqueCnaes.map(cnae => ({ value: cnae, label: cnae }));

  return (
    <MainLayout>
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