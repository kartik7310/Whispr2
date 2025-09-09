
import axios from "axios";
import { prisma } from "../../client/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interface";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    try {
      const googleToken = token;
      const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
      googleOauthURL.searchParams.set("id_token", googleToken);

      const { data } = await axios.get(googleOauthURL.toString(), {
        responseType: "json",
      });

      const User = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!User) {
        await prisma.user.create({
          data: {
            email: data.email,
            firstName: data.given_name,
            lastName: data.family_name,
            profileImageURL: data.picture,
          },
        });
      }
      const userInDB = await prisma.user.findFirst({
        where: { email: data.email },
      });
      if (!userInDB) throw new Error("User with email not found");

      const userToken = await JWTService.generateTokenForUser({
        id: userInDB.id,
        email: userInDB.email,
      });
      return userToken;
    } catch (error: any) {
  console.error(error.response?.data || error.message);
  throw new Error("Google token verification failed");
}

  },

  getCurrentUser: async (parent: any, arg: any, ctx: GraphqlContext) => {
    try {
      const id = ctx.user?.id;
      if (!id) return null;

      const user = await prisma.user.findUnique({ where: { id } });
      console.log("user is here", user);

      return user;
    } catch (error: any) {
  console.error(error.response?.data || error.message);
  throw new Error("Google token verification failed");
}

  },
};

export const resolvers = { queries };
