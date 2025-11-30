import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// ============= CRUD EMPRESAS =============

// GET - Listar todas as empresas (com paginação e filtros)
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0, uf } = req.query;
    
    let query = 'SELECT * FROM empresas';
    const params = [];
    
    if (uf) {
      query += ' WHERE ente_federativo = $1';
      params.push(uf);
      query += ` LIMIT $2 OFFSET $3`;
      params.push(limit, offset);
    } else {
      query += ` LIMIT $1 OFFSET $2`;
      params.push(limit, offset);
    }
    
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

// GET - Buscar empresa por CNPJ
router.get('/:cnpj', async (req, res) => {
  try {
    const { cnpj } = req.params;
    const result = await pool.query('SELECT * FROM empresas WHERE cnpj = $1', [cnpj]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Empresa não encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Criar nova empresa
router.post('/', async (req, res) => {
  try {
    const { cnpj, razao_social, natureza_juridica, qualificacao_responsavel, capital_social, porte, ente_federativo } = req.body;
    
    const result = await pool.query(
      `INSERT INTO empresas (cnpj, razao_social, natureza_juridica, qualificacao_responsavel, capital_social, porte, ente_federativo) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [cnpj, razao_social, natureza_juridica, qualificacao_responsavel, capital_social, porte, ente_federativo]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT - Atualizar empresa
router.put('/:cnpj', async (req, res) => {
  try {
    const { cnpj } = req.params;
    const { razao_social, natureza_juridica, qualificacao_responsavel, capital_social, porte, ente_federativo } = req.body;
    
    const result = await pool.query(
      `UPDATE empresas 
       SET razao_social = $1, natureza_juridica = $2, qualificacao_responsavel = $3, 
           capital_social = $4, porte = $5, ente_federativo = $6 
       WHERE cnpj = $7 RETURNING *`,
      [razao_social, natureza_juridica, qualificacao_responsavel, capital_social, porte, ente_federativo, cnpj]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Empresa não encontrada' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Deletar empresa
router.delete('/:cnpj', async (req, res) => {
  try {
    const { cnpj } = req.params;
    const result = await pool.query('DELETE FROM empresas WHERE cnpj = $1 RETURNING *', [cnpj]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Empresa não encontrada' });
    }
    
    res.json({ success: true, message: 'Empresa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
