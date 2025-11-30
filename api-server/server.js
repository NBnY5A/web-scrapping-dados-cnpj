import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rotas
import empresasRoutes from './routes/empresas.js';
import cnaesRoutes from './routes/cnaes.js';
import paisesRoutes from './routes/paises.js';
import estabelecimentosRoutes from './routes/estabelecimentos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Permite requisições do React
app.use(express.json()); // Parse JSON no body

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API de CNPJs está rodando!',
    endpoints: {
      empresas: '/api/empresas',
      cnaes: '/api/cnaes',
      paises: '/api/paises',
      estabelecimentos: '/api/estabelecimentos'
    }
  });
});

// Rotas da API
app.use('/api/empresas', empresasRoutes);
app.use('/api/cnaes', cnaesRoutes);
app.use('/api/paises', paisesRoutes);
app.use('/api/estabelecimentos', estabelecimentosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}`);
});

export default app;
