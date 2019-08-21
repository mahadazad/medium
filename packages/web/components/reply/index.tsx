import { distanceInWordsToNow } from "date-fns";
import { Box, Flex, Text } from "rebass";
import { CopyLink } from "../../modules/comment/copyLink";
import { DeleteComment } from "../../modules/comment/deleteComment";
import { ActionsDropdown } from "../../modules/post/shared/actionsDropdown";
import { Button } from "../button";
import { Actions, Content, TopRow, UserAvatar } from "../comment";
import { Avatar } from "../common/Avatar";
import { useState } from "react";
import { Link } from "../../server/routes";

interface ReplyProps {
  id: string;
  text: any;
  createdAt: string;
  creator: any;
  isAuthor: boolean | null;
  numReactions: number;
  hasReacted: boolean | null;
}

export const Reply: React.FC<ReplyProps> = ({
  id,
  creator: { username, pictureUrl },
  isAuthor,
  text,
  numReactions,
  createdAt,
  hasReacted
}) => {
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });
  const [reacted, setReacted] = useState(hasReacted);
  return (
    <TopRow>
      <UserAvatar>
        <Link route={"profile"} params={{ username }}>
          <a style={{ cursor: "pointer" }}>
            <Avatar borderRadius={3} size={34} src={pictureUrl} alt="avatar" />
          </a>
        </Link>
      </UserAvatar>
      <Content>
        <Flex alignItems="baseline">
          <Box mb={2} mt={0} mr={0} ml={"0rem"}>
            <Link route={"profile"} params={{ username }}>
              <a>
                <Text fontWeight="bold" fontSize={4}>
                  {username}
                </Text>
              </a>
            </Link>
          </Box>
          <Box mb={2} mt={0} mr={0} ml={"0rem"}>
            <Text>{dtString}</Text>
          </Box>
          <Actions style={{ display: "flex", marginLeft: "auto" }}>
            <div>
              <ActionsDropdown id={id}>
                {isAuthor && <DeleteComment commentId={id} />}
                <CopyLink commentId={id} />
              </ActionsDropdown>
            </div>
          </Actions>
        </Flex>
        <Text lineHeight={1.58} mb="1rem" fontSize={4}>
          {text}
        </Text>
        <div style={{ display: "flex" }}>
          {reacted ? (
            <Button
              variant="tag"
              style={{
                cursor: "pointer",
                color: "#5C6AC4",
                width: "100px"
              }}
            >
              {numReactions == 1
                ? `${numReactions}` + " like"
                : `${numReactions}` + " likes"}
            </Button>
          ) : (
            <Button
              variant="tag"
              style={{
                cursor: "pointer",
                width: "100px"
              }}
            >
              {numReactions == 1
                ? `${numReactions}` + " like"
                : `${numReactions}` + " likes"}
            </Button>
          )}
        </div>
      </Content>
    </TopRow>
  );
};
