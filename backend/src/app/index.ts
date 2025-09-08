import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';
import { User } from './user';
import cors from "cors"
export async function initServer() {
  const app = express();
  
  const typeDefs = `
   ${User.types}

    type Query {
      ${User.query}
    }
  `;

  const resolvers = {
    Query: {
     ...User.resolvers.queries
    },
  };

  const graphQlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await graphQlServer.start();

  // Add body-parser to parse JSON request bodies before Apollo Middleware
 app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use('/graphql', bodyParser.json(), expressMiddleware(graphQlServer));

  return app;
}
