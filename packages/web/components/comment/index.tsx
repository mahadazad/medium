import { distanceInWordsToNow } from "date-fns";
import { includes } from "lodash";
import * as React from "react";
import { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import styled, { css } from "styled-components";
import { CopyLink } from "../../modules/comment/copyLink";
import { DeleteComment } from "../../modules/comment/deleteComment";
import { ActionsDropdown } from "../../modules/post/shared/actionsDropdown";
import { UserPopover } from "../../modules/user/shared/userPopover";
import { Avatar } from "../common/Avatar";
import {
  CommentTargetContext,
  CommentTargetContextProps
} from "../context/CommentTargetContext";
import { PopoverContext, PopoverContextProps } from "../context/PopoverContext";

interface CommentProps {
  id: string;
  body: any;
  createdAt: string;
  creator: any;
  Link: any;
}

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  currentTarget: string | undefined;
  id: string;
}

export const CommmentContainer = styled.div<ContainerProps>`
  width: 100%;
  padding: 10px;
  margin: 1.6rem 0px 1rem 0px;
  border-radius: 3px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);

  ${({ currentTarget, id }) =>
    includes(currentTarget, id) &&
    css`
      border-color: #2188ff;
      box-shadow: 0 0px 5px #c8e1ff;
    `}
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content actions";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto;
  gap: 8px 8px;
  flex: 1 1 0%;
`;

export const UserAvatar = styled.div`
  display: grid;
  grid-area: avatar / avatar / avatar / avatar;
`;

export const Actions = styled.div`
  display: grid;
  grid-area: actions / actions / actions / actions;
`;

export const Content = styled.div`
  display: grid;
  grid-area: content / content / content / content;
`;

export const Comment: React.FC<CommentProps> = ({
  id,
  creator: { username, pictureUrl },
  body,
  Link,
  createdAt
}) => {
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });

  const { target, ref3 } = useContext<CommentTargetContextProps>(
    CommentTargetContext
  );

  const { bind } = useContext<PopoverContextProps>(PopoverContext);

  return (
    <CommmentContainer id={id} ref={ref3} currentTarget={target}>
      <TopRow>
        <UserAvatar>
          <UserPopover username={username}>
            <Link route={"profile"} params={{ username }}>
              <a style={{ cursor: "pointer" }}>
                <Avatar
                  borderRadius={3}
                  size={34}
                  src={pictureUrl}
                  alt="avatar"
                  {...bind}
                />
              </a>
            </Link>
          </UserPopover>
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
          </Flex>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            {body}
          </Text>
        </Content>
        <Actions style={{ display: "flex", marginLeft: "auto" }}>
          <div>
            <ActionsDropdown cId={id}>
              <DeleteComment commentId={id} />
              <CopyLink commentId={id} />
            </ActionsDropdown>
          </div>
        </Actions>
      </TopRow>
    </CommmentContainer>
  );
};
