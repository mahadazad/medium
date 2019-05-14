import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  ManyToMany
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Rate } from "./Rate";
import { User } from "./User";
import { Comment } from "./Comment";
import { Topic } from "./Topic";
import { Tag } from "./Tag";

@Entity()
@ObjectType()
export class Posting extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("uuid")
  creatorId: string;

  @Field()
  @Column("uuid", { nullable: true })
  topicId: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, p => p.posting)
  comments: Promise<Comment[]>;

  @Field(() => Int)
  numComments: number;

  @ManyToOne(() => Topic, p => p.postings, { onDelete: "CASCADE" })
  topic: Promise<Topic>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.postings)
  creator: Promise<User>;

  @Field({ description: "The title of the posting" })
  @Column({ type: "text" })
  title: string;

  @Field({ description: "The body of the posting" })
  @Column({ type: "text" })
  body: string;

  @Field(() => [Rate], { nullable: true })
  @Column({ type: "int", nullable: true })
  ratings: Rate[];

  @ManyToMany(() => Tag)
  tags: Tag[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
