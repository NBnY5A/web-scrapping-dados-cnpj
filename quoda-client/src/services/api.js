// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper para fazer requisições
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};

// ============= Serviços para Empresas =============

export const empresasAPI = {
  // Listar empresas com filtros
  getAll: async (params = {}) => {
    const { limit = 50, offset = 0, uf } = params;
    const queryParams = new URLSearchParams({ limit, offset });
    if (uf) queryParams.append('uf', uf);
    
    return fetchAPI(`/empresas?${queryParams}`);
  },

  // Buscar empresa por CNPJ
  getById: async (cnpj) => {
    return fetchAPI(`/empresas/${cnpj}`);
  },

  // Criar nova empresa
  create: async (empresaData) => {
    return fetchAPI('/empresas', {
      method: 'POST',
      body: JSON.stringify(empresaData),
    });
  },

  // Atualizar empresa
  update: async (cnpj, empresaData) => {
    return fetchAPI(`/empresas/${cnpj}`, {
      method: 'PUT',
      body: JSON.stringify(empresaData),
    });
  },

  // Deletar empresa
  delete: async (cnpj) => {
    return fetchAPI(`/empresas/${cnpj}`, {
      method: 'DELETE',
    });
  },
};

// ============= Serviços para CNAEs =============

export const cnaesAPI = {
  // Listar CNAEs
  getAll: async (params = {}) => {
    const { limit = 100, offset = 0 } = params;
    const queryParams = new URLSearchParams({ limit, offset });
    
    return fetchAPI(`/cnaes?${queryParams}`);
  },

  // Buscar CNAE por código
  getById: async (codigo) => {
    return fetchAPI(`/cnaes/${codigo}`);
  },

  // Criar novo CNAE
  create: async (cnaeData) => {
    return fetchAPI('/cnaes', {
      method: 'POST',
      body: JSON.stringify(cnaeData),
    });
  },

  // Atualizar CNAE
  update: async (codigo, cnaeData) => {
    return fetchAPI(`/cnaes/${codigo}`, {
      method: 'PUT',
      body: JSON.stringify(cnaeData),
    });
  },

  // Deletar CNAE
  delete: async (codigo) => {
    return fetchAPI(`/cnaes/${codigo}`, {
      method: 'DELETE',
    });
  },
};

// ============= Serviços para Países =============

export const paisesAPI = {
  // Listar todos os países
  getAll: async () => {
    return fetchAPI('/paises');
  },

  // Buscar país por ID
  getById: async (id) => {
    return fetchAPI(`/paises/${id}`);
  },

  // Criar novo país
  create: async (paisData) => {
    return fetchAPI('/paises', {
      method: 'POST',
      body: JSON.stringify(paisData),
    });
  },
};

// ============= Serviços para Estabelecimentos =============

export const estabelecimentosAPI = {
  // Listar estabelecimentos com filtros
  getAll: async (params = {}) => {
    const { limit = 1000, offset = 0, uf, cnae } = params;
    const queryParams = new URLSearchParams({ limit, offset });
    if (uf) queryParams.append('uf', uf);
    if (cnae) queryParams.append('cnae', cnae);
    
    return fetchAPI(`/estabelecimentos?${queryParams}`);
  },

  // Buscar estabelecimento por CNPJ completo
  getById: async (cnpj) => {
    return fetchAPI(`/estabelecimentos/${cnpj}`);
  },
};
