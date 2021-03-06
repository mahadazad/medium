import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID, Int, Ctx, Float } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comment";
import { Topic } from "./Topic";
import { PostingTag } from "./PostingTag";
import { MyContext } from "../types/Context";
import { Tag } from "./Tag";
import { PostingTopic } from "./PostingTopic";
import { Bookmark } from "./Bookmark";
import { Reaction } from "./Reaction";

@Entity()
@ObjectType()
export class Posting extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("uuid")
  creatorId: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, c => c.posting)
  comments: Promise<Comment[]>;

  @Field(() => Int)
  numComments: number;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: "boolean", nullable: true })
  allowResponses: boolean;

  @Field(() => Int)
  numReactions: number;

  @Field(() => Float)
  readingTime: number;

  @ManyToOne(() => Topic, p => p.postings, { onDelete: "CASCADE" })
  topic: Promise<Topic>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.postings)
  creator: Promise<User>;

  @Field(() => Boolean, { nullable: true })
  async isAuthor(@Ctx() ctx: MyContext): Promise<Boolean> {
    return ctx.req.session!.userId === this.creatorId;
  }

  @Field(() => Boolean, { nullable: true })
  isBookmark: boolean;

  @Field(() => Boolean, { nullable: true })
  hasReacted: boolean;

  @Field({ description: "The preview title of the posting", nullable: true })
  @Column({ type: "text", nullable: true })
  previewTitle: string;

  @Field({ description: "The preview subtitle of the posting", nullable: true })
  @Column({ type: "text", nullable: true })
  previewSubtitle: string;

  @Field({ description: "The preview image of the posting", nullable: true })
  @Column({ type: "text", nullable: true })
  previewImage: string;

  @Field({ description: "The title of the posting" })
  @Column({ type: "text" })
  title: string;

  @Field({ description: "The body of the posting" })
  @Column({ type: "text" })
  body: string;

  @Field(() => [Tag], { nullable: true })
  async tags(@Ctx() { tagPostingLoader }: MyContext): Promise<Tag[]> {
    return tagPostingLoader.load(this.id);
  }

  @Field(() => [Topic], { nullable: true })
  async topics(@Ctx() { topicPostingLoader }: MyContext): Promise<Topic[]> {
    return topicPostingLoader.load(this.id);
  }

  @OneToMany(() => PostingTag, pt => pt.posting)
  tagConnection: Promise<PostingTag[]>;

  @OneToMany(() => PostingTopic, pt => pt.posting)
  topicConnection: Promise<PostingTopic[]>;

  @OneToMany(() => Bookmark, b => b.posting)
  userBookmarkConnection: Promise<Bookmark[]>;

  @OneToMany(() => Reaction, r => r.posting)
  userReactionConnection: Promise<Reaction[]>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
