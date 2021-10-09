import "./database";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs"; 
import resolvers from "./graphql/resolvers";
//import { buildSchema } from "type-graphql";


export async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
    //await server.listen({port: 5000}); // only without express

  return app;
}

