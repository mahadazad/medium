import React from "react";
import styled from "styled-components";

import rem from "../../utils/rem";
import Link from "../link";
import { GetTopicsComponent } from "../apollo-components";
import { navbarHeight } from "../../utils/sizes";

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: ${rem(30)};
`;

const NavLink = styled(Link).attrs({
  unstyled: true,
  prefetch: true
})`
  margin: inherit;
  line-height: ${rem(navbarHeight)};
  transition: opacity 0.2s, transform 0.2s;
  letter-spacing: ${rem(0.4)};
  text-transform: uppercase;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

const NavLinks = (): JSX.Element => {
  return (
    <GetTopicsComponent variables={{ input: { offset: 0, limit: 12 } }}>
      {({ data }) => {
        return (
          <Wrapper>
            {data && data.findTopics && (
              <>
                {data.findTopics.topics.map(topic => (
                  <React.Fragment key={topic.id}>
                    <NavLink href={`/topic/${topic.name}`}>
                      {topic.name}
                    </NavLink>
                  </React.Fragment>
                ))}
              </>
            )}

            <NavLink href={`/topics`}>more</NavLink>
          </Wrapper>
        );
      }}
    </GetTopicsComponent>
  );
};

export default NavLinks;