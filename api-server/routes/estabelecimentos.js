import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// ============= CRUD ESTABELECIMENTOS =============

// GET - Listar todos os estabelecimentos (com paginação e filtros)
router.get('/', async (req, res) => {
  try {
    const { limit = 1000, offset = 0, uf, cnae } = req.query;
    
    let query = `
      SELECT 
        e.cnpj,
        e.cnpj_basico,
        e.nome_fantasia,
        e.identificador_matriz_filial,
        e.cnae_principal_codigo,
        c.descricao as cnae_descricao,
        emp.ente_federativo as uf,
        emp.razao_social,
        emp.porte
      FROM estabelecimentos e
      LEFT JOIN cnaes c ON e.cnae_principal_codigo = c.codigo_cnae
      LEFT JOIN empresas emp ON e.cnpj_basico = emp.cnpj
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 1;
    
    if (uf) {
      query += ` AND emp.ente_federativo = $${paramCount}`;
      params.push(uf);
      paramCount++;
    }
    
    if (cnae) {
      query += ` AND e.cnae_principal_codigo = $${paramCount}`;
      params.push(cnae);
      paramCount++;
    }
    
    query += ` ORDER BY e.cnpj LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Buscar estabelecimento por CNPJ completo
router.get('/:cnpj', async (req, res) => {
  try {
    const { cnpj } = req.params;
    const result = await pool.query(
      `SELECT 
        e.*,
        c.descricao as cnae_descricao,
        emp.razao_social,
        emp.porte,
        emp.ente_federativo as uf
      FROM estabelecimentos e
      LEFT JOIN cnaes c ON e.cnae_principal_codigo = c.codigo_cnae
      LEFT JOIN empresas emp ON e.cnpj_basico = emp.cnpj
      WHERE e.cnpj = $1`,
      [cnpj]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Estabelecimento não encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
