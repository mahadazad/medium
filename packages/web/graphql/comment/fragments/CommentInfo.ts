import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { ReplyInfoFragment } from "./ReplyInfo";

export const CommentInfoFragment = gql`
  fragment CommentInfo on Comment {
    id
    text
    postingId
    creatorId
    isAuthor
    numReactions
    hasReacted
    creator {
      ...UserInfo
    }
    replies {
      ...ReplyInfo
    }
    createdAt
  }
  ${UserInfoFragment}, ${ReplyInfoFragment}
`;
