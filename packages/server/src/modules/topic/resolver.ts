import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Root,
  Mutation
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Topic } from "../../entity/Topic";
import { TopicRepository } from "../../repositories/TopicRepo";
import { MyContext } from "../../types/Context";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getConnection } from "typeorm";
import { ApolloError } from "apollo-server-core";
// import { createResolver } from "../shared/create-resolver";
import { CreateTopicInput, FindTopicsInput } from "./Input";
import {
  DeleteTopicResponse,
  TopicResponse,
  FindTopicResponse
} from "./Response";
import { User } from "../../entity/User";
import { PostingRepository } from "../../repositories/PostRepo";

// const suffix = "Topic";
// const TOPIC_LIMIT = 16;

// export const createTopic = createResolver(
//   suffix,
//   CreateTopicInput,
//   Topic,
//   TopicResponse
// );

export const loadCreatorForTopic = loadCreatorResolver(Topic);

@Resolver(Topic)
export class TopicResolver {
  @InjectRepository(TopicRepository)
  private readonly topicRepo: TopicRepository;
  @InjectRepository(PostingRepository)
  private readonly postingRepo: PostingRepository;

  @FieldResolver(() => User)
  creator(@Root() root: any, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(root.creatorId);
  }

  @FieldResolver()
  numPostings(@Root() root: Topic): Promise<number> {
    return this.postingRepo.count({ where: { topicId: root.id } });
  }

  @Query(() => FindTopicResponse)
  async findTopics(@Arg("input")
  {
    offset,
    limit
  }: FindTopicsInput): Promise<FindTopicResponse> {
    if (limit > 12) {
      throw new ApolloError("max limit of 12");
    }

    const topics = await getConnection()
      .getRepository(Topic)
      .createQueryBuilder("topic")
      .skip(offset)
      .take(limit + 1)
      .orderBy("name", "DESC")
      .getMany();

    return {
      hasMore: topics.length === limit + 1,
      topics: topics.slice(0, limit)
    };
  }

  @Mutation(() => TopicResponse, { name: `createTopic` })
  @Authorized()
  async createTopic(
    @Arg("topic") input: CreateTopicInput
  ): Promise<TopicResponse> {
    const value = await this.topicRepo
      .create({
        ...input
      })
      .save();

    return {
      topic: value
    };
  }

  @Query(() => Topic, {
    nullable: true
  })
  async getTopicById(@Arg("id") id: string) {
    return this.topicRepo.findOne(id);
  }

  @Query(() => Topic, {
    nullable: true
  })
  async getTopicByName(@Arg("name") name: string) {
    return this.topicRepo.findOne({ where: { name } });
  }

  @Mutation(() => DeleteTopicResponse, {
    nullable: true
  })
  @Authorized()
  async deleteTopicById(@Arg("id") id: string): Promise<DeleteTopicResponse> {
    const value = this.topicRepo.findOne(id);
    if (value) {
      this.topicRepo.delete(id);
      return { ok: true };
    }
    return { ok: false };
  }
}
