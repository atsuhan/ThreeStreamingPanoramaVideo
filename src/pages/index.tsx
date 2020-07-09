// Base
import React from 'react';
import { SEO } from 'src/components';
import ThreeBaseComponent from 'src/components/three/ThreeBaseComponent';

// For Page
import 'src/styles/static-global-webar.scss';

const Element = ({ path }: { path: string }): React.ReactElement => (
  <>
    <SEO title='PanoramaStreaming' pathname={path} />
    <ThreeBaseComponent />
  </>
);

export default Element;
