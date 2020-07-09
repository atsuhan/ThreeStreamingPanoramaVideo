const simpleBoxScenePipelineModule = () => ({
  name: `simpleBox`,

  onStart: () => {
    const { scene, camera } = XR8.Threejs.xrScene();

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    XR8.XrController.updateCameraProjectionMatrix({
      origin: camera.position,
      facing: camera.quaternion,
    });
  },
});
export default simpleBoxScenePipelineModule;
