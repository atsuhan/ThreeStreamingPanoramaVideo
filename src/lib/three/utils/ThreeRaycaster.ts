export default class ThreeRaycaster {
  private raycaster;

  constructor() {
    this.raycaster = new THREE.Raycaster();
  }

  getRayIntersectPos = (event: TouchEvent, camera: any, meshes: Array<any>) => {
    const screenPos = this.getScreenPos(event);
    this.raycaster.setFromCamera(screenPos, camera);
    const intersects = this.raycaster.intersectObjects(meshes);
    return intersects.length > 0 ? intersects[0].point : null;
  };

  private getScreenPos = (event: any) => {
    const touch = event.touches ? event.touches[0] : event;
    const element = event.target;

    const x = touch.clientX - element.offsetLeft;
    const y = touch.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    return {
      x: (x / w) * 2 - 1,
      y: -(y / h) * 2 + 1,
    };
  };
}
