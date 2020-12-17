import { Resolver, Query, Ctx } from 'type-graphql';

import { PrismaClient } from '@prisma/client';

import { User } from '@prisma-generated/type-graphql';

interface Context {
  prisma: PrismaClient;
}

@Resolver()
class UsersResolver {
  @Query(() => User, { nullable: true })
  async bestUser(@Ctx() { prisma }: Context): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: 'lucas@teste.com' },
    });
  }
}

export default UsersResolver;
