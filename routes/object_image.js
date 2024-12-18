const express = require("express");
const db = require("../db.js");

const router = express.Router();
const TABLE = "object_image";

router.get("/", (req, res) => {
  const sql = `SELECT * FROM ${TABLE}`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const sql = `SELECT * FROM ${TABLE} WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Object image not found" });
    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  const { object_id, src } = req.body;
  const sql = `INSERT INTO ${TABLE} (object_id, src) VALUES (?, ?)`;
  db.query(sql, [object_id, src], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, object_id, src });
  });
});

router.put("/:id", (req, res) => {
  const { src } = req.body;
  const sql = `UPDATE ${TABLE} SET src = ? WHERE id = ?;`;
  db.query(sql, [src, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Object image updated successfully" });
  });
});

router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM ${TABLE} WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Object image deleted successfully" });
  });
});

module.exports = router;
