import { query } from "../database/db.js";

const getBerita = async (req, res) => {
  const sql = "SELECT * FROM berita";
    try {
        const berita = await query(sql);
        berita.forEach(data => {
          data.img = `/image/${data.img}`; 
          });
        res.status(200).json(berita);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const getBeritaById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM berita WHERE id = ?";
  try {
    const berita = await query(sql, [id]);
    if (berita.length > 0) {
      berita[0].img = `/image/${berita[0].img}`; // Ubah path gambar sesuai dengan lokasi penyimpanan Anda
      res.status(200).json(berita[0]);
    } else {
      res.status(404).json({ message: "Berita tidak ditemukan" });
    }
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    res.status(500).json({ error: "Gagal mengambil berita" });
  }
};

const postBerita = async (req, res) => {
  try {
    const { date, title, descripsi, author,kategori } = req.body;
    const img = req.file ? req.file.filename : null;

    console.log('Received data:');
    console.log('Date:', date);
    console.log('Title:', title);
    console.log('Descripsi:', descripsi);
    console.log('Author:', author);
    console.log('Kategori:', kategori);
    console.log('Image:', img);
    
    if (!img || !date || !title || !descripsi || !author || !kategori) {
      return res.status(400).json({ error: "Semua kolom harus diisi" });
    }

    const tambahBeritaQuery = `INSERT INTO berita (img, date, title, descripsi, author,kategori) VALUES (?, ?, ?, ?, ?,?)`;
    await query(tambahBeritaQuery, [img, date, title, descripsi, author, kategori]);

    res.status(201).json({ message: "Berita berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan berita:", error);
    res.status(500).json({ error: "Gagal menambahkan berita" });
  }
};

const updateBerita = async (req, res) => {
  const { id } = req.params;
  const { date, title, descripsi, author,kategori } = req.body;
  const img = req.file ? req.file.filename : null;

  try {
    const existingBerita = await query("SELECT * FROM berita WHERE id = ?", [id]);
    if (existingBerita.length === 0) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    const updateQuery = `UPDATE berita SET img = COALESCE(?, img), date = ?, title = ?, descripsi = ?, author = ?, kategori = ? WHERE id = ?`;
    await query(updateQuery, [img, date, title, descripsi, author,kategori, id]);

    res.status(200).json({ message: "Berita berhasil diperbarui" });
  } catch (error) {
    console.error("Gagal memperbarui berita:", error);
    res.status(500).json({ error: "Gagal memperbarui berita" });
  }
};

const deleteBerita = async (req, res) => {
  const { id } = req.params;
  try {
    const existingBerita = await query("SELECT * FROM berita WHERE id = ?", [id]);
    if (existingBerita.length === 0) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    await query("DELETE FROM berita WHERE id = ?", [id]);
    res.status(200).json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus berita:", error);
    res.status(500).json({ error: "Gagal menghapus berita" });
  }
};

export { getBerita,getBeritaById,postBerita,updateBerita,deleteBerita  };