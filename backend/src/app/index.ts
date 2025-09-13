import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import { User } from "./user";
import cors from "cors";
import JWTService from "../services/jwt";
import { Post } from "./post";
import { userInfo } from "os";
import { post } from "axios";
export async function initServer() {
  const app = express();

  const typeDefs = `
   ${User.types}
    ${Post.types}

    type Query {
      ${User.query}
    }

    type mutation{
     ${Post.mutations}
  `;

  const resolvers = {
    Query: {
      ...User.resolvers.queries,
    },
  };

  const graphQlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await graphQlServer.start();
  app.use(bodyParser.json());

  app.use(
    "/graphql",
    cors({ origin: process.env.FRONTEND_URL, credentials: true })
  );
  app.use(
    "/graphql",
    expressMiddleware(graphQlServer, {
      context: async ({ req, res }) => {
        const authHeader = req.headers.authorization;
        let user = null;

        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          try {
            user = JWTService.decodeToken(token);
          } catch (err: any) {
            console.warn("Invalid JWT:", err.message);
            user = null;
          }
        }

        return { user };
      },
    })
  );

  return app;
}
