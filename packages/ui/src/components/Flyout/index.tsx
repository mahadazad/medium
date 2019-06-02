import * as React from "react";
import styled from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StyledFlyout = styled.div`
  padding: 6px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: -25%;
  top: 36px;
  z-index: 1000;
`;

const StyledRow = styled.div`
  position: relative;
  padding: 5px;
`;

export const Flyout = ({ children }: any): JSX.Element => (
  <StyledFlyout className={"flyout"}>
    <StyledRow>{children}</StyledRow>
  </StyledFlyout>
);
