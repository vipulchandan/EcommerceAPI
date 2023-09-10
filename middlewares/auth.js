import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        // Bearer Token
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "No token provided!"
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: false,
                    message: "Unauthorized access!"
                });
            } else {
                req.userId = decoded.userId;
                next();
            }
        })
    } catch(error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

export {
    auth
}