import React, { useState } from 'react';
import { Search, Building2, MapPin, Users, Briefcase, Calendar, DollarSign, FileText } from 'lucide-react';

// Components
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader } from '../components/ui/Card';

// API Services
import { estabelecimentosAPI } from '../services/api';

const PesquisarCNPJ = ({ onNavigate }) => {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(null);

  // Formatar CNPJ enquanto digita
  const formatarCNPJ = (value) => {
    // Remove tudo que não é número
    const numeros = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numeros.length <= 14) {
      return numeros
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  };

  const handleInputChange = (e) => {
    const formatted = formatarCNPJ(e.target.value);
    setCnpj(formatted);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    
    // Remove caracteres não numéricos
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    
    if (cnpjLimpo.length !== 14) {
      setError('CNPJ deve ter 14 dígitos');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResultado(null);
      
      const response = await estabelecimentosAPI.getById(cnpjLimpo);
      setResultado(response.data);
    } catch (err) {
      console.error('Erro ao buscar CNPJ:', err);
      setError(err.message || 'CNPJ não encontrado');
      setResultado(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout currentPage="pesquisar" onNavigate={onNavigate}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Pesquisar CNPJ</h2>
        <p className="text-gray-500 mt-1">Consulte informações detalhadas de estabelecimentos</p>
      </div>

      {/* Formulário de Busca */}
      <Card className="mb-8">
        <form onSubmit={handleBuscar} className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-2">
                CNPJ
              </label>
              <input
                id="cnpj"
                type="text"
                value={cnpj}
                onChange={handleInputChange}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                <Search size={20} />
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </form>
      </Card>

      {/* Resultado da Busca */}
      {resultado && (
        <div className="space-y-6">
          {/* Informações Principais */}
          <Card>
            <CardHeader 
              title="Informações do Estabelecimento" 
              subtitle={`CNPJ: ${formatarCNPJ(resultado.cnpj)}`} 
            />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem 
                icon={Building2} 
                label="Razão Social" 
                value={resultado.razao_social || 'Não informado'} 
              />
              <InfoItem 
                icon={FileText} 
                label="Nome Fantasia" 
                value={resultado.nome_fantasia || 'Não informado'} 
              />
              <InfoItem 
                icon={Briefcase} 
                label="Tipo" 
                value={resultado.identificador_matriz_filial === 'Matriz' ? 'Matriz' : 'Filial'} 
              />
              <InfoItem 
                icon={MapPin} 
                label="UF" 
                value={resultado.uf || 'Não informado'} 
              />
              <InfoItem 
                icon={Users} 
                label="Porte" 
                value={resultado.porte || 'Não informado'} 
              />
              <InfoItem 
                icon={FileText} 
                label="CNPJ Básico" 
                value={formatarCNPJ(resultado.cnpj_basico + '00000000').substring(0, 10)} 
              />
            </div>
          </Card>

          {/* Informações de CNAE */}
          <Card>
            <CardHeader 
              title="Atividade Econômica" 
              subtitle="CNAE Principal" 
            />
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="text-blue-600 mt-1" size={24} />
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">
                      {resultado.cnae_principal_codigo || 'Não informado'}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {resultado.cnae_descricao || 'Descrição não disponível'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Mensagem Inicial */}
      {!resultado && !loading && !error && (
        <Card className="p-12">
          <div className="text-center text-gray-400">
            <Search size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Digite um CNPJ para buscar informações</p>
          </div>
        </Card>
      )}
    </MainLayout>
  );
};

// Componente auxiliar para exibir informações
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">
      <Icon className="text-gray-400" size={20} />
    </div>
    <div className="flex-1">
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-gray-800 font-medium">
        {value}
      </div>
    </div>
  </div>
);

export default PesquisarCNPJ;
