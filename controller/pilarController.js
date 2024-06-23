import { query } from "../database/db.js";

const getPilar = async (req, res) => {
  const sql = "SELECT * FROM Pilar";
  try {
    const pilar = await query(sql);
    res.status(200).json(pilar);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
 

};

export {getPilar}