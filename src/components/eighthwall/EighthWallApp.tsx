/**
 * Component : 8thWall Base
 */
import React from 'react';

const CANVAS_ID = `camerafeed`;

const runAR = (prop: EighthWallProp) => {
  const load = () => {
    XRExtras.Loading.showLoading({ onxrloaded });
  };

  window.XRExtras ? load() : window.addEventListener(`xrextrasloaded`, load);

  const onxrloaded = () => {
    XR8.addCameraPipelineModules([
      XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
      XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
      XR8.XrController.pipelineModule(), // Enables SLAM tracking.
      XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
      XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
      XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
      XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
      prop.customPipelineModule(),
    ]);
    XR8.run({
      canvas: document.getElementById(CANVAS_ID),
      webgl2: prop.isWebGl2,
    });
  };
};

type EighthWallProp = {
  customPipelineModule: any;
  isWebGl2: boolean;
};

export default class EighthWallApp extends React.Component<EighthWallProp> {
  static defaultProps: EighthWallProp = {
    customPipelineModule: () => ({ name: `sample` }),
    isWebGl2: false,
  };

  componentDidMount = () => {
    runAR(this.props);
  };

  render() {
    return <canvas id={CANVAS_ID} />;
  }
}
