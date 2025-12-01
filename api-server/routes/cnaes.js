import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// ============= CRUD CNAES =============

// GET - Listar todos os CNAEs
router.get('/', async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const result = await pool.query('SELECT * FROM cnaes LIMIT $1 OFFSET $2', [limit, offset]);
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Buscar CNAE por código
router.get('/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    const result = await pool.query('SELECT * FROM cnaes WHERE codigo_cnae = $1', [codigo]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'CNAE não encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Criar novo CNAE
router.post('/', async (req, res) => {
  try {
    const { codigo_cnae, descricao } = req.body;
    
    const result = await pool.query(
      'INSERT INTO cnaes (codigo_cnae, descricao) VALUES ($1, $2) RETURNING *',
      [codigo_cnae, descricao]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT - Atualizar CNAE
router.put('/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    const { descricao } = req.body;
    
    const result = await pool.query(
      'UPDATE cnaes SET descricao = $1 WHERE codigo_cnae = $2 RETURNING *',
      [descricao, codigo]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'CNAE não encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Deletar CNAE
router.delete('/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    const result = await pool.query('DELETE FROM cnaes WHERE codigo_cnae = $1 RETURNING *', [codigo]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'CNAE não encontrado' });
    }
    
    res.json({ success: true, message: 'CNAE deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
