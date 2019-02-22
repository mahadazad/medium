import { InputType, Field, Int } from "type-graphql";
import { Posting } from "../../entity/Posting";
import { User } from "../../entity/User";

@InputType({ description: "New posting data" })
export class CreatePostingInput implements Partial<Posting> {
  @Field()
  title: string;

  @Field({ nullable: true })
  body?: string;
}

@InputType({ description: "Old posting data" })
export class DeletePostingInput implements Partial<Posting> {
  @Field()
  id: string;
}

@InputType()
export class FindPostingsInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class FindUserPostingsInput {
  @Field(() => User)
  creator: Promise<User>;
}
