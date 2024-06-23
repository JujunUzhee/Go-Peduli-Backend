import { query } from "../database/db.js";

const getFormulirDonasi = async (req, res) => {
    const sql = "SELECT * FROM formulir_donasi";
    try {
        const donasi = await query(sql);
        res.status(200).json(donasi);
    } catch (error) {
        console.log("Error while fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data" });
    }
};

const postFormulirDonasi = async (req, res) => {
    const { pilihLokasi, kategori, nama, nomor, email, pengantaran, alamat } = req.body;
    // Validasi bidang yang diperlukan
    if (!pilihLokasi || !kategori || !nama || !nomor || !email || !pengantaran || !alamat) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    const sql = "INSERT INTO formulir_donasi (pilihLokasi, kategori, nama, nomor, email, pengantaran, alamat) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
    try {
       await query(sql, [ pilihLokasi, kategori, nama, nomor, email, pengantaran, alamat]);
       return res.status(201).json({
        "status": "success",
        "message": `Berhasil mendaftarkan dengan nama alamat email: ${email}`,
      });
    } catch (error) {
        console.log("Error while processing data:", error);
        res.status(500).json({ message: "Failed to process data" });
    }
};

export { getFormulirDonasi, postFormulirDonasi };
