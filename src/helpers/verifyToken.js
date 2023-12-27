import jwt from "jsonwebtoken";

const UNAUTHORIZED = 401;
const EXPIRED_MESSAGE = "Su sesión expiró, por favor inicie sesión de nuevo.";
const INVALID_TOKEN_MESSAGE = "El token es invalido";

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        return res.status(UNAUTHORIZED).send("No existe un token")
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const { exp: expDate } = decoded;
  
      //Expired?
      if (Date.now() / 1000 > expDate) {
        console.log("expired");
        res.status(UNAUTHORIZED).send(EXPIRED_MESSAGE);
      } else {
        next();
      }
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return res.status(UNAUTHORIZED).send({status: UNAUTHORIZED, message: INVALID_TOKEN_MESSAGE} );
      }
  };