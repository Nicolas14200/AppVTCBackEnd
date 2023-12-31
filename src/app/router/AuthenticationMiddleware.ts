import { JwtIdentityGateway } from "../../adapters/gateways/jwt/JwtIdentityGateway";
const jwt = new JwtIdentityGateway(process.env.JWT_KEY);
export function authenticationMiddleware(req, res, next){
    try{
        const token = req.header('access_key')!;
        const verifyToken = jwt.decoded(token);
        req.user =  {
            id: verifyToken.id,
            email: verifyToken.email
        }
        return next();
    }
    catch(error){
        return res.status(401).send({
            message: error.message
        })
    }
}