import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import DeviceOrientationControls from 'three-device-orientation';
import getUA from 'src/lib/utils/getUA';

const VIDEO_PATH = '/video/PanoramaSample.mp4';
const UA = getUA();

// ReactComponent
class ThreeBaseComponent extends React.Component {
  private canvasEl!: HTMLCanvasElement;

  private videoEl!: HTMLVideoElement;

  private videoStyle = {
    display: 'none',
  };

  componentDidMount(): void {
    initThreeRenderer(this.canvasEl);
    initThreeScene();
    initThreeCamera();
    initThreeLight();
    initPanoramaVideo(this.videoEl);
    initHelper();
    initControll();

    requestAnimationFrame(update); // loop
  }

  render(): React.ReactElement {
    return (
      <>
        <canvas
          ref={(el: HTMLCanvasElement): void => {
            this.canvasEl = el;
          }}
        />
        <video
          ref={(el: HTMLVideoElement): void => {
            this.videoEl = el;
          }}
          muted
          style={this.videoStyle}
        />
      </>
    );
  }
}
export default ThreeBaseComponent;

// Three.js functions
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let ambientlLight: THREE.AmbientLight;
let directionalLight: THREE.DirectionalLight;
let controll: any;

const initThreeRenderer = (canvasEl: HTMLCanvasElement): void => {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvasEl,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
};

const initThreeScene = (): void => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1c1c1c);
};

const initThreeCamera = (): void => {
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight
  );
  // camera.position.set(0, 0, 1);
};

const initThreeLight = (): void => {
  // AmbientLight
  ambientlLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientlLight);

  // directionalLight
  directionalLight = new THREE.DirectionalLight('#ffffff', 1.0);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.position.set(10, 10, 10);
  directionalLight.lookAt(0, 0, 0);
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.bottom = -10;
  directionalLight.shadow.camera.left = -10;
  scene.add(directionalLight);
};

const initPanoramaVideo = (videlEl: HTMLVideoElement): void => {
  videlEl.src = VIDEO_PATH;
  videlEl.load();

  videlEl.addEventListener('loadedmetadata', (): void => {
    videlEl.play();
    const geometry = new THREE.SphereGeometry(5, 60, 40, -1.58);
    geometry.scale(-1, 1, 1);

    const texture: THREE.Texture = new THREE.VideoTexture(videlEl);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  });
};

const initControll = (): void => {
  if (UA.isPC) {
    controll = new OrbitControls(camera, renderer.domElement);
  }

  if (UA.isSP) {
    window.addEventListener('deviceorientation', setOrientationControls, true);
  }
};

const setOrientationControls = (): void => {
  controll = new DeviceOrientationControls(camera, true);
  controll.connect();
  window.removeEventListener('deviceorientation', setOrientationControls, true);
};

const initHelper = (): void => {
  // grid helper
  const gridHelper = new THREE.GridHelper(20, 20);
  scene.add(gridHelper);

  // const lightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(lightHelper);
};

const update = (): void => {
  if (controll) controll.update();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};
