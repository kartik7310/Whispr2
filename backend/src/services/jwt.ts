import JWT from "jsonwebtoken"
import { JWTUser } from "../interface"

const secret = "kartik"

class JWTService {
  public static async generateTokenForUser({id,email}: { email:string,id:string }) {
    const payload:JWTUser = {
      id,
      email
    }
    const token = JWT.sign(payload, secret, { expiresIn: "1h" }) // optional expiry
    return token
  }

  public static decodeToken(token:string){
    
    return JWT.verify(token,secret) as JWTUser
  }

}

export default JWTService
