// Base
import React from 'react';
import { SEO } from 'src/components';
import keys from 'src/data/keys.json';

// webar
import 'src/styles/static-global-webar.scss';
import ScriptTag from 'src/components/ScriptTag';
import EighthWallApp from 'src/components/eighthwall/EighthWallApp';
import mvScenePipelineModule from 'src/lib/pipelines/mvScenePipelineModule';
import { css } from '@emotion/core';

const VIDEO_STYLE = css({
  display: `none`,
});

const Component: React.FCX = () => (
  <div>
    <ScriptTag name='threejs' src='//cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js' />
    <ScriptTag name='xrextras' src='//cdn.8thwall.com/web/xrextras/xrextras.js' />
    <ScriptTag name='xrweb' isAsync src={`//apps.8thwall.com/xrweb?appKey=${keys.EIGHTHWALL}`} />
    <EighthWallApp customPipelineModule={mvScenePipelineModule} />
    <div className='video-container'>
      <video
        className='video-hoshino'
        src='/video/StayHomeHoshino.mp4'
        loop
        crossOrigin='anonymous'
        css={VIDEO_STYLE}
      />
    </div>
  </div>
);

export default ({ path }: { path: string }) => (
  <>
    <SEO title='WebAR-MV' pathname={path} />
    <Component />
  </>
);
