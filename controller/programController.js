import { query } from "../database/db.js";

const getProgram = async (req, res) => {
  const sql = "SELECT * FROM laporan";
  try {
    const program = await query(sql);

    program.forEach(article => {
      article.content = JSON.parse(article.content);
      article.dokumentasi = JSON.parse(article.dokumentasi);
      article.img = `/image/${article.img}`; // Assuming 'image' folder is in 'public'
      article.dokumentasi = article.dokumentasi.map(image => `/image/${image}`); // Map each documentation image path
    });

    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

export { getProgram };
