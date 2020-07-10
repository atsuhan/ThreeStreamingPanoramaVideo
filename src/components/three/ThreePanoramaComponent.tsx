import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

// ReactComponent
class ThreeBaseComponent extends React.Component {
  private canvasEl!: HTMLCanvasElement;

  componentDidMount(): void {
    initThreeRenderer(this.canvasEl);
    initThreeScene();
    initThreeCamera();
    initThreeLight();
    initSkySphere();
    initHelper();

    requestAnimationFrame(update); // loop
  }

  render(): React.ReactElement {
    return (
      <canvas
        ref={(el: HTMLCanvasElement): void => {
          this.canvasEl = el;
        }}
      />
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
let controls: OrbitControls;

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
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
  camera.position.set(0, 0, 1);

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
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

const initSkySphere = (): void => {
  const geometry = new THREE.SphereGeometry(5, 60, 40, -1.58);
  geometry.scale(-1, 1, 1);
  const texture = new THREE.TextureLoader().load('/img/PanoramaSample.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

const initHelper = (): void => {
  // grid helper
  const gridHelper = new THREE.GridHelper(20, 20);
  scene.add(gridHelper);

  // camera helper
  const lightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  scene.add(lightHelper);
};

const update = (): void => {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};
