// Base
import React from 'react';
import { SEO } from 'src/components';
import ThreePanoramaComponent from 'src/components/three/ThreePanoramaComponent';

// For Page
import 'src/styles/static-global-webar.scss';

const Element = ({ path }: { path: string }): React.ReactElement => (
  <>
    <SEO title='PanoramaStreaming' pathname={path} />
    <ThreePanoramaComponent />
  </>
);

export default Element;
