// Dados simulados de CNPJs
export const companyData = [
  { id: 1, name: "Empresa A", uf: "SP", cnae: "Tecnologia", revenue: 500000 },
  { id: 2, name: "Empresa B", uf: "RJ", cnae: "Varejo", revenue: 120000 },
  { id: 3, name: "Empresa C", uf: "SP", cnae: "Serviços", revenue: 300000 },
  { id: 4, name: "Empresa D", uf: "MG", cnae: "Tecnologia", revenue: 450000 },
  { id: 5, name: "Empresa E", uf: "RS", cnae: "Agronegócio", revenue: 800000 },
  { id: 6, name: "Empresa F", uf: "SP", cnae: "Varejo", revenue: 200000 },
  { id: 7, name: "Empresa G", uf: "SC", cnae: "Tecnologia", revenue: 320000 },
  { id: 8, name: "Empresa H", uf: "RJ", cnae: "Serviços", revenue: 150000 },
  { id: 9, name: "Empresa I", uf: "MG", cnae: "Agronegócio", revenue: 600000 },
  { id: 10, name: "Empresa J", uf: "BA", cnae: "Varejo", revenue: 180000 },
];

// Estados do Brasil
export const ufOptions = [
  { value: "SP", label: "São Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "MG", label: "Minas Gerais" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "SC", label: "Santa Catarina" },
  { value: "BA", label: "Bahia" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "CE", label: "Ceará" },
  { value: "GO", label: "Goiás" },
];

// Setores CNAE
export const cnaeOptions = [
  { value: "Tecnologia", label: "Tecnologia" },
  { value: "Varejo", label: "Varejo" },
  { value: "Serviços", label: "Serviços" },
  { value: "Agronegócio", label: "Agronegócio" },
  { value: "Indústria", label: "Indústria" },
  { value: "Construção", label: "Construção" },
];