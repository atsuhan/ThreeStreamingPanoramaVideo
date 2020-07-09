// Base
import React from 'react';
import { SEO } from 'src/components';

// For Page
import 'src/styles/static-global-webar.scss';
import ScriptTag from 'src/components/ScriptTag';

const Component: React.FCX = () => (
  <div>
    <ScriptTag name='threejs' src='//cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js' />
  </div>
);

const Element = ({ path }: { path: string }): React.ReactElement => (
  <>
    <SEO title='PanoramaStreaming' pathname={path} />
    <Component />
  </>
);

export default Element;
