import { InputType, Field, Int } from "type-graphql";
import { Posting } from "../../entity/Posting";

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
export class FindPostingInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}