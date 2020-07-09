import ThreeAmbientLight from '../three/objects/ThreeAmbientLight';
import ThreeDirectionalLight from '../three/objects/ThreeDirectionalLight';
import ThreeRaycaster from '../three/utils/ThreeRaycaster';
import ThreeGround from '../three/objects/ThreeGround';
import ThreeModel from '../three/objects/ThreeModel';

const modelPath = `https://dl.dropbox.com/s/7p111ixvp8moaqi/roastedbeef.glb`;
let threeModelRoastedBeef: ThreeModel;
let threeAmbientLight: ThreeAmbientLight;
let threeDirectionalLight: ThreeDirectionalLight;
let threeGround: ThreeGround;

const roastedBeefModule = () => ({
  name: `roastedBeef`,

  onBeforeRun: async () => {
    threeModelRoastedBeef = new ThreeModel({ modelPath });
    await threeModelRoastedBeef.init();
  },

  onStart: () => {
    const { scene, camera, renderer } = XR8.Threejs.xrScene();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Ambient Light
    threeAmbientLight = new ThreeAmbientLight({
      force: 2,
    });
    threeAmbientLight.addTo(scene);

    // Directional Light
    threeDirectionalLight = new ThreeDirectionalLight({
      force: 2,
    });
    threeDirectionalLight.addTo(scene);
    threeDirectionalLight.move([0, 10, -10]);
    threeDirectionalLight.lookAt(new THREE.Vector3(0, 0, 0));

    threeGround = new ThreeGround();
    threeGround.addTo(scene);

    // touchevent
    window.addEventListener(`touchstart`, (e) => {
      const raycaster = new ThreeRaycaster();
      const rayPos = raycaster.getRayIntersectPos(e, camera, [threeGround.obj]);
      threeModelRoastedBeef.move(rayPos);

      if (!threeModelRoastedBeef.parent) {
        threeModelRoastedBeef.addTo(scene);
        threeModelRoastedBeef.setScale(0.002);
      }
    });
  },
});
export default roastedBeefModule;
