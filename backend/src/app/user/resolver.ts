import { Prisma, PrismaClient } from "@prisma/client";
import axios from "axios";
import { prisma } from "../../client/db";
import JWTService from "../../services/jwt";

const queries = {
  verifyGoogleToken:async(parent:any,{token}:{token:string})=>{
    const googleToken = token;
     const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
     googleOauthURL.searchParams.set("id_token",googleToken)

     const {data} = await axios.get(
      googleOauthURL.toString(),
      {
        responseType:"json"
      }
     ) ;
     
     const User = await prisma.user.findFirst({
      where:{
        email:data.email
      }
     });

     if(!User){
      await prisma.user.create({
        data:{
          email:data.email,
          firstName:data.firstName,
          lastName:data.lastName,
          profileImageURL:data.picture
        }
      })
     }
     const userInDB = await prisma.user.findFirst({where:{email:data.email}})
     if(!userInDB) throw new Error('User with email not found');
     
     
const userToken = await JWTService.generateTokenForUser({
  id: userInDB.id.toString(), // convert number to string
  email: userInDB.email
});
return userToken
  }
}

export const resolvers = {queries};