import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { TagInfoFragment } from "../../tag/fragments/TagInfo";

export const getPostingByIdQuery = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      title
      body
      createdAt
      isAuthor
      isBookmark
      numComments
      numReactions
      creator {
        ...UserInfo
      }
      tags {
        ...TagInfo
      }
    }
  }
  ${UserInfoFragment}, ${TagInfoFragment}
`;
