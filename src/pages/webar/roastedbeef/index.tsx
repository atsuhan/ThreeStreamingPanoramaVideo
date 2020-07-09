// Base
import React from 'react';
import { SEO } from 'src/components';
import keys from 'src/data/keys.json';

// webar
import 'src/styles/static-global-webar.scss';
import ScriptTag from 'src/components/ScriptTag';
import EighthWallApp from 'src/components/eighthwall/EighthWallApp';
import roastedBeefModule from 'src/lib/pipelines/roastedBeefModule';

const Component: React.FCX = () => (
  <div>
    <ScriptTag name='threejs' src='//cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js' />
    <ScriptTag name='three-loader' src='//cdn.rawgit.com/mrdoob/three.js/master/examples/js/loaders/GLTFLoader.js' />
    <ScriptTag name='xrextras' src='//cdn.8thwall.com/web/xrextras/xrextras.js' />
    <ScriptTag name='xrweb' isAsync src={`//apps.8thwall.com/xrweb?appKey=${keys.EIGHTHWALL}`} />
    <EighthWallApp customPipelineModule={roastedBeefModule} />
  </div>
);

export default ({ path }: { path: string }) => (
  <>
    <SEO title='WebAR-RoastedBeef' pathname={path} />
    <Component />
  </>
);
