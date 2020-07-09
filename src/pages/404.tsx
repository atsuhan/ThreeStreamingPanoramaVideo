import React from 'react';
import { SEO } from 'src/components';
import { baseStyle } from 'src/styles';

import styled from '@emotion/styled';

const Component: React.FCX = (): React.ReactElement => (
  <main>
    <h1>Not Found</h1>
  </main>
);

const StyledComponent = styled(Component)`
  ${baseStyle}
  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

const Element = ({ path }: { path: string }): React.ReactElement => (
  <>
    <SEO title='Not Found' pathname={path} />
    <StyledComponent />
  </>
);

export default Element;
