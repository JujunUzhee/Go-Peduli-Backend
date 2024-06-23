import { query } from "../database/db.js";

const getMitraFormulir = async (req, res) => {
    const sql = "SELECT * FROM mitra_formulir";
    try {
        const donasi = await query(sql);
        res.status(200).json(donasi);
    } catch (error) {
        console.log("Error while fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data" });
    }
};

const postMitraFormulir = async (req, res) => {
    const { judulDonasi, lokasi, pengantaran, tanggalAkhir, namaMitra, email, kategori } = req.body;
    // Validate required fields
    if (!judulDonasi || !lokasi || !pengantaran || !tanggalAkhir || !namaMitra || !email || !kategori) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    
    const sql = "INSERT INTO mitra_formulir (judul_donasi, lokasi, pengantaran, tanggal_akhir, nama_mitra, email, kategori) VALUES (?, ?, ?, ?, ?, ?, ?)";
    try {
        await query(sql, [judulDonasi, lokasi, pengantaran, tanggalAkhir, namaMitra, email, JSON.stringify(kategori)]);
        return res.status(201).json({
            status: "success",
            message: `Successfully registered partner with email: ${email}`,
        });
    } catch (error) {
        console.log("Error while processing data:", error);
        res.status(500).json({ message: "Failed to process data" });
    }
};

export { getMitraFormulir, postMitraFormulir };
