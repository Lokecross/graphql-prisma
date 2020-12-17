import 'reflect-metadata';

import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { PrismaClient } from '@prisma/client';

import { UserCrudResolver } from '@prisma-generated/type-graphql';

import CustomUserResolver from '@modules/users/infra/graphql/resolvers/UsersResolver';

interface Context {
  prisma: PrismaClient;
}

const starter = async () => {
  const prisma = new PrismaClient();

  const schema = await buildSchema({
    resolvers: [CustomUserResolver, UserCrudResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    playground: true,
    context: (): Context => ({ prisma }),
  });

  server.listen({ port: 4444 }, () => {
    console.log('start server on port 4444');
  });
};

starter();
