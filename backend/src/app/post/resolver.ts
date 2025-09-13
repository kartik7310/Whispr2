import { prisma } from "../../client/db";
import { GraphqlContext } from "../../interface";

interface CreatePostPayload {
  content: string;
  imageUrl?: string;
}

const mutations = {
  createPost: async (
    parent: any,
    { payload }: { payload: CreatePostPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) {
      throw new Error("You are not authenticated");
    }

    const post = await prisma.post.create({
      data: {
        content: payload.content,
        imageUrl: payload.imageUrl, // fixed
        author: { connect: { id: ctx.user.id } }, // connect logged-in user
      },
    });

    return post;
  },
};

export const resolvers = {mutations}
