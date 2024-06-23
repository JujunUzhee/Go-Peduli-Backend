import express from "express";
const router = express.Router();

const daftarMitra = async (nama, nowa, email, lokasi, kategori_pakaian, pengantar, alamat) => {
    let sql = "INSERT INTO formulir_mitra(nama, nowa, email, lokasi, kategori_pakaian, pengantar, alamat) VALUES (?, ?, ?, ?, ?, ?, ?)"
    await query(sql, [nama, nowa, email, lokasi, kategori_pakaian, pengantar, alamat]);
  }
  
  router.post("/formulir-mitra", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const data = req.body
    console.log(data)
    await daftarMitra(data.nama, data.nowa, data.email, data.lokasi, data.kategori_pakaian, data.pengantar,
      data.alamat
    )
  
    return res.status(201).json({
      "status": "success",
      "message": "Berhasil mendaftarkan mitra dengan nama alamat email: " + data.email,
    })
  })
  
  export default router 