import { query } from '../database/db.js';

const getData = async (req, res) => {
    const sqlProgram = 'SELECT * FROM Program';
    const sqlDonasi = 'SELECT * FROM Donasi';

    try {
        const [programs, donations, news] = await Promise.all([
            query(sqlProgram),
            query(sqlDonasi),
        ]);

        // Modify the image path for donations
        const donationsWithImageUrl = donations.map(donation => {
            return {
                ...donation,
                image: `/image/${donation.image}`
            };
        });

        res.status(200).json({ programs, donations: donationsWithImageUrl, news });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

export { getData };
