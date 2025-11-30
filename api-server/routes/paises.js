import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// ============= CRUD PAÍSES =============

// GET - Listar todos os países
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pais ORDER BY nome');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Buscar país por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pais WHERE id_pais = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'País não encontrado' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Criar novo país
router.post('/', async (req, res) => {
  try {
    const { nome } = req.body;
    const result = await pool.query(
      'INSERT INTO pais (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
