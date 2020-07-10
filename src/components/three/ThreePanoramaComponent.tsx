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
    initCubeModel();
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
  camera.position.set(0, 0, -20);

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
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

const initCubeModel = (): void => {
  const boxGeom = new THREE.BoxGeometry(100, 100, 100);
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 'rgb(255, 0, 0)' });
  const boxMesh = new THREE.Mesh(boxGeom, boxMaterial);
  boxMesh.position.set(0, 0, -10);
  scene.add(boxMesh);
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
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};
