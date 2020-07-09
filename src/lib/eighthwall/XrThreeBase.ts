export default class XrThreeBase {
  renderer: any;
  scene: any;
  camera: any;

  constructor() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
  }

  initRenderer() {
    this.renderer = XR8.Threejs.xrScene().renderer;
  }

  initScene() {
    this.scene = XR8.Threejs.xrScene().scene;
  }

  initCamera() {
    this.camera = XR8.Threejs.xrScene().camera;
  }
}
