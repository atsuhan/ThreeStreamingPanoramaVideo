// Base
import React from 'react';
import { SEO } from 'src/components';
import keys from 'src/data/keys.json';

// webar
import 'src/styles/static-global-webar.scss';
import ScriptTag from 'src/components/ScriptTag';
import EighthWallApp from 'src/components/eighthwall/EighthWallApp';
import simpleBoxScenePipelineModule from 'src/lib/pipelines/simpleBoxScenePipelineModule';

const Component: React.FCX = () => (
  <div className='eighthwall-container'>
    <ScriptTag name='threejs' src='https://cdnjs.cloudflare.com/ajax/libs/three.js/106/three.min.js' />
    <ScriptTag name='xrextras' src='//cdn.8thwall.com/web/xrextras/xrextras.js' />
    <ScriptTag name='xrweb' isAsync src={`//apps.8thwall.com/xrweb?appKey=${keys.EIGHTHWALL}`} />
    <EighthWallApp customPipelineModule={simpleBoxScenePipelineModule} />
  </div>
);

export default ({ path }: { path: string }) => (
  <>
    <SEO title='WebAR-Top' pathname={path} />
    <Component />
  </>
);
