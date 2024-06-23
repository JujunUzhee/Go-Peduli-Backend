import { query } from "../database/db.js";

const getFaq = async (req ,res) => {
    const sql = "SELECT * FROM faq"
    try {
        const faq = await query(sql);
        res.status(200).json(faq)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data" });
    }
}

export {getFaq}