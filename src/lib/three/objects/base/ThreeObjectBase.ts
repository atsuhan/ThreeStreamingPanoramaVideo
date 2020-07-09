export default class ThreeObjectBase {
  parent: any;
  obj: any;

  constructor() {
    this.parent = null;
    this.obj = null;
  }

  addTo(parent: any) {
    this.parent = parent;
    this.parent.add(this.obj);
  }

  remove() {
    this.parent.remove(this.obj);
    this.parent = null;
  }

  move(val: any) {
    if (val.isVector3) {
      this.obj.position.copy(val);
      return;
    }
    if (Array.isArray(val)) this.obj.position.fromArray(val);
    console.log(`ThreeObjectBase.move : Invalid value`);
  }

  rotate(val: any) {
    this.obj.quaternion.copy(val);
  }

  rotateOnAxis(axis: any, angle: number) {
    this.obj.rotateOnAxis(axis, angle);
  }

  lookAt(vec3: any) {
    this.obj.lookAt(vec3);
  }

  lookAtAxisY(target: any) {
    this.obj.rotation.y = Math.atan2(target.position.x - this.obj.position.x, target.position.z - this.obj.position.z);
  }

  setScale(val: any) {
    if (typeof val === `number`) {
      this.obj.scale.setScalar(val);
      return;
    }
    if (val.isVector3) {
      this.obj.scale.copy(val);
      return;
    }
    if (Array.isArray(val)) {
      this.obj.scale.fromArray(val);
      return;
    }
    console.log(`ThreeObjectBase.setScale : Invalid value`);
  }
}
