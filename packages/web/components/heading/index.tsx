import * as React from "react";
import styled from "styled-components";
import { headerFont } from "../../utils/fonts";

export const Header = styled.h2`
  text-transform: uppercase;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  letter-spacing: -0.04px;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
  font-family: ${headerFont};
  margin-top: ${(props: any) => props.mt || ""};
`;

export const StoryTitle = styled.h3`
  letter-spacing: -0.32px;
  font-size: 21.6px;
  max-height: 48px;
  line-height: 24px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-weight: 600;
  text-align: inherit;
  font-style: normal;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: rgba(0, 0, 0, 0.84);
  word-break: break-word;
  font-family: ${headerFont};
`;

export const Heading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (
  props
): JSX.Element => {
  return <Header {...props}>{props.children}</Header>;
};