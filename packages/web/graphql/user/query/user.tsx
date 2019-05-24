import gql from "graphql-tag";
import { UserInfoFragment } from "../fragments/UserInfo";

export const findUserQuery = gql`
  query FindUser($username: String!) {
    findUser(username: $username) {
      ...UserInfo
      postings {
        id
        title
        body
        createdAt
        numComments
        tags {
          id
          name
        }
        creator {
          ...UserInfo
        }
      }
      comments {
        id
        text
        createdAt
        creator {
          ...UserInfo
        }
      }
    }
  }
  ${UserInfoFragment}
`;
