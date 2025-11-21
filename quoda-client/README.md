# Quoda Client - Dashboard CNPJ

Dashboard moderno para visualização e análise de dados de CNPJs brasileiros com gráficos interativos e filtros dinâmicos.

## 🚀 Tecnologias e Dependências

### Core
- **React** `^19.2.0` - Biblioteca principal
- **React DOM** `^19.2.0` - Renderização DOM
- **Vite** `^7.2.4` - Build tool e dev server

### Estilização
- **Tailwind CSS** `^3.4.18` - Framework CSS utility-first
- **PostCSS** `^8.5.6` - Processador CSS
- **Autoprefixer** `^10.4.22` - Adiciona prefixos CSS automaticamente
- **clsx** `^2.1.1` - Utilitário para classes condicionais
- **tailwind-merge** `^3.4.0` - Merge de classes Tailwind

### Gráficos e Visualização
- **Recharts** `^3.4.1` - Biblioteca de gráficos React (principal)
- **Chart.js** `^4.5.1` - Biblioteca de gráficos canvas
- **react-chartjs-2** `^5.3.1` - Wrapper React para Chart.js


### Utilitários
- **papaparse** `^5.5.3` - Parser de CSV

### DevDependencies
- **@vitejs/plugin-react** `^5.1.1` - Plugin Vite para React
- **babel-plugin-react-compiler** `^1.0.0` - Compilador React
- **ESLint** `^9.39.1` - Linter JavaScript/React
- **eslint-plugin-react-hooks** `^7.0.1` - Regras ESLint para Hooks
- **eslint-plugin-react-refresh** `^0.4.24` - Regras ESLint para HMR

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes base reutilizáveis
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   └── Select.jsx
│   ├── layout/          # Componentes de layout
│   │   ├── Sidebar.jsx
│   │   └── MainLayout.jsx
│   └── charts/          # Componentes de gráficos
│       ├── BarChartDist.jsx
│       └── PieChartCnae.jsx
├── data/
│   └── mockData.js      # Dados simulados
├── pages/
│   └── Dashboard.jsx    # Página principal
└── App.jsx
```

## 🔧 Configuração

### Tailwind CSS
O projeto usa Tailwind CSS v3 com PostCSS. Configurações em:
- `tailwind.config.js`
- `postcss.config.js`

### Vite
Configuração customizada com React Compiler habilitado em `vite.config.js`

---

**Template base:** React + Vite com HMR e ESLint
