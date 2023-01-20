export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            res.clearCookie("refreshToken");
            return res.end();
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}