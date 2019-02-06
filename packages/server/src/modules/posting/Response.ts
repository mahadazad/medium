import { ObjectType, Field } from "type-graphql";
import { Posting } from "../../entity/Posting";

@ObjectType()
export class CreatePostingResponse {
  @Field()
  posting: Posting;
}

@ObjectType()
export class DeletePostingResponse {
  @Field()
  ok: boolean;
}
