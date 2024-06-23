import { query } from "../database/db.js";
import path from 'path';

const getDonasi = async (req, res) => {
  const sql = "SELECT * FROM Donasi";
  try {
    const donations = await query(sql);
    const donationsWithImageUrl = donations.map(donation => {
      return {
        ...donation,
        image: `/image/${donation.image}` 
      };
    });
    res.status(200).json(donationsWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const getDonasiById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Donasi WHERE id = ?";
  try {
    const donation = await query(sql, [id]);
    if (donation.length > 0) {
      donation[0].image = path.join('/image', donation[0].image);
      res.status(200).json(donation[0]);
    } else {
      res.status(404).json({ message: "Donation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const postDonasi = async (req, res) => {
  try {
    const { title, mitra, location, kategori, layanan, email, tanggal } = req.body;
    const image = req.file ? req.file.filename : null;

    if (
      !title ||
      !mitra ||
      !location ||
      !kategori ||
      !layanan ||
      !email ||
      !image ||
      !tanggal
    ) {
      return res.status(400).json({ error: "Semua kolom harus diisi" });
    }

    const tambahDonasiQuery = `INSERT INTO donasi (title, mitra, location, kategori, layanan, email, image, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await query(tambahDonasiQuery, [
      title,
      mitra,
      location,
      kategori,
      layanan,
      email,
      image,
      tanggal,
    ]);

    res.status(201).json({ message: "Donasi berhasil ditambahkan" });
  } catch (error) {
    console.error("Gagal menambahkan donasi:", error);
    res.status(500).json({ error: "Gagal menambahkan donasi" });
  }
};

const updateDonasi = async (req, res) => {
  const { id } = req.params;
  const { title, mitra, location, kategori, layanan, email, tanggal } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const existingDonation = await query("SELECT * FROM Donasi WHERE id = ?", [id]);
    if (existingDonation.length === 0) {
      return res.status(404).json({ message: "Donation not found" });
    }

    const updateQuery = `UPDATE Donasi SET title = ?, mitra = ?, location = ?, kategori = ?, layanan = ?, email = ?, image = COALESCE(?, image), tanggal = ? WHERE id = ?`;
    await query(updateQuery, [title, mitra, location, kategori, layanan, email, image, tanggal, id]);

    res.status(200).json({ message: "Donasi berhasil diperbarui" });
  } catch (error) {
    console.error("Gagal memperbarui donasi:", error);
    res.status(500).json({ error: "Gagal memperbarui donasi" });
  }
};

const deleteDonasi = async (req, res) => {
  const { id } = req.params;
  try {
    const existingDonation = await query("SELECT * FROM Donasi WHERE id = ?", [id]);
    if (existingDonation.length === 0) {
      return res.status(404).json({ message: "Donation not found" });
    }

    await query("DELETE FROM Donasi WHERE id = ?", [id]);
    res.status(200).json({ message: "Donasi berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus donasi:", error);
    res.status(500).json({ error: "Gagal menghapus donasi" });
  }
};

export { getDonasi, getDonasiById, postDonasi, updateDonasi, deleteDonasi };
