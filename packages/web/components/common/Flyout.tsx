import * as React from "react";
import styled, { keyframes } from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
  `;

const StyledFlyout = styled.div`
  padding: 6px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  animation-name: ${scaleIn};
  animation-duration: 0.15s;
  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
`;

export const Flyout = React.forwardRef<HTMLDivElement>(
  ({ children }: any, ref: any): JSX.Element => (
    <StyledFlyout className={"flyout"} ref={ref}>
      {children}
    </StyledFlyout>
  )
);
