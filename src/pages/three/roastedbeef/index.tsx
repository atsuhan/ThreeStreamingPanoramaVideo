// Base
import React from 'react';
import { SEO } from 'src/components';

// webar
import 'src/styles/static-global-webar.scss';
import ScriptTag from 'src/components/ScriptTag';
import EighthWallApp from 'src/components/eighthwall/EighthWallApp';
import roastedbeefScenePipelineModule from 'src/lib/pipelines/roastedBeefModule';

const Component: React.FCX = () => (
  <div>
    <ScriptTag name='threejs' src='//cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js' />
    <ScriptTag name='xrextras' src='//cdn.8thwall.com/web/xrextras/xrextras.js' />
    <EighthWallApp customPipelineModule={roastedbeefScenePipelineModule} />
  </div>
);

export default ({ path }: { path: string }) => (
  <>
    <SEO title='WebAR-RoastedBeef' pathname={path} />
    <Component />
  </>
);
