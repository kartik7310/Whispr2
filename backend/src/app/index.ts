import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';

export async function initServer() {
  const app = express();

  const typeDefs = `
    type Query {
      hello: String
      sayHelloToMe(name:String!):String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello World',
      sayHelloToMe:(parent:any,{name}:{name:String})=>`hey${name}`
    },
  };

  const graphQlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await graphQlServer.start();

  // Add body-parser to parse JSON request bodies before Apollo Middleware
  app.use('/graphql', bodyParser.json(), expressMiddleware(graphQlServer));

  return app;
}
