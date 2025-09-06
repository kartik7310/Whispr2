import JWT from "jsonwebtoken"

const secret = "kartik"

class JWTService {
  public static async generateTokenForUser({id,email}: { email:string,id:string }) {
    const payload = {
      id,
      email
    }
    const token = JWT.sign(payload, secret, { expiresIn: "1h" }) // optional expiry
    return token
  }
}

export default JWTService
