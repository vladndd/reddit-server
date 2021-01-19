import {
  InputType,
  Field
} from "type-graphql";


@InputType()
export class RegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
