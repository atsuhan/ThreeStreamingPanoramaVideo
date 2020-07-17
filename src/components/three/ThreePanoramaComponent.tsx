/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import DeviceOrientationControls from 'three-device-orientation';
import getUA from 'src/lib/utils/getUA';
import Hls from 'hls.js';
import OrientationPermissionButton from '../OrientationPermissionButton/OrientationPermissionButton';

const VIDEO_PATH =
  'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8';

// Three.js functions
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let ambientlLight: THREE.AmbientLight;
let directionalLight: THREE.DirectionalLight;
let controll: any;
let video: HTMLVideoElement;
let videoCanvas: HTMLCanvasElement;
let videoCtx: CanvasRenderingContext2D | null;
let material: THREE.MeshBasicMaterial;

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
  camera.position.set(0, 1.7, 0);
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

const initPanoramaVideo = (videoEl: HTMLVideoElement): void => {
  video = videoEl;

  const ua = getUA();
  if (!ua.Safari || ua.iPadOS) {
    initNonIOSSafariVideo(videoEl);
  } else {
    initIOSSafari(videoEl);
  }
};

const initNonIOSSafariVideo = (videoEl: HTMLVideoElement): void => {
  const hls = new Hls();
  hls.loadSource(VIDEO_PATH);
  hls.attachMedia(videoEl);
  hls.on(Hls.Events.MANIFEST_PARSED, (): void => {
    videoEl.play();

    const tex = new THREE.VideoTexture(videoEl);
    initSphere(tex);
  });
};

const initIOSSafari = (videoEl: HTMLVideoElement): void => {
  videoEl.src = VIDEO_PATH;
  videoEl.autoplay = true;

  videoCanvas = document.createElement('canvas');
  videoCanvas.width = 1024;
  videoCanvas.height = 512;
  videoCanvas.style.position = 'fixed';
  videoCanvas.style.top = '0';
  videoCanvas.style.right = '0';
  videoCanvas.style.width = '20%';
  videoCanvas.style.height = 'auto';
  document.body.appendChild(videoCanvas);
  videoCtx = videoCanvas.getContext('2d');

  const tex = new THREE.CanvasTexture(videoCanvas);
  tex.needsUpdate = true;

  initSphere(tex);
};

const initSphere = (tex: THREE.Texture): void => {
  const geometry = new THREE.SphereGeometry(5, 60, 40, -1.58);
  geometry.scale(-1, 1, 1);

  material = new THREE.MeshBasicMaterial({
    map: tex,
  });
  if (material.map) material.map.needsUpdate = true;

  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 0, -1);
  scene.add(sphere);
};

const initControll = (): void => {
  const ua = getUA();
  if (ua.isPC) {
    controll = new OrbitControls(camera, renderer.domElement);
  }

  if (ua.isSP) {
    window.addEventListener('deviceorientation', setOrientationControls, true);
  }
};

const setOrientationControls = (): void => {
  controll = new DeviceOrientationControls(camera, true);
  controll.connect();
  window.removeEventListener('deviceorientation', setOrientationControls, true);
};

const initHelper = (): void => {
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);
};

const update = (): void => {
  if (videoCtx) {
    videoCtx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
    if (material.map) material.map.needsUpdate = true;
  }

  requestAnimationFrame(update);
  if (controll) controll.update();
  renderer.render(scene, camera);
};

const onResize = (): void => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// ReactComponent
class ThreeBaseComponent extends React.Component {
  private canvasEl!: HTMLCanvasElement;

  private videoEl!: HTMLVideoElement;

  private canvasStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  private videoStyle: React.CSSProperties = {
    position: 'fixed',
    width: '38.4%',
    height: '21.6%',
    left: 0,
    top: 0,
    zIndex: 10000,
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
    window.addEventListener('resize', onResize, true);
  }

  render(): React.ReactElement {
    return (
      <>
        <OrientationPermissionButton
          onClick={(): void => {
            window.addEventListener(
              'deviceorientation',
              setOrientationControls,
              true
            );
          }}
        />
        <canvas
          ref={(el: HTMLCanvasElement): void => {
            this.canvasEl = el;
          }}
          style={this.canvasStyle}
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
