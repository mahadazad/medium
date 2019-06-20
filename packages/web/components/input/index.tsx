import * as React from "react";
import styled from "styled-components";
import { Icon } from "../icon";
import { icons } from "../icon/icons";

const Container = styled.div`
  padding: 0.8rem 1.5rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const InputEl = styled.input`
  padding-left: 0.1rem;
  border: none;
  border-radius: 3px;
`;

interface Props {
  big?: boolean;
  errorText?: string;
  icon?: keyof typeof icons;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void | undefined;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void | undefined;
  placeholder?: string;
  style?: React.CSSProperties | undefined;
  value?: string;
}

export class Input extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { icon, style, errorText, big, ...props } = this.props;
    return (
      <div style={style}>
        <Container>
          <Row>
            {icon && (
              <Icon
                name={icon}
                fill="#b7c1c6"
                style={{ marginRight: ".8rem" }}
              />
            )}
            <InputEl style={{ fontSize: big ? "2rem" : "1.6rem" }} {...props} />
          </Row>
        </Container>
        {errorText && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
        )}
      </div>
    );
  }
}