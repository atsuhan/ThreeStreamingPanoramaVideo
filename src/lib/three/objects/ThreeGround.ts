/**
 * XR地面クラス
 */

import _ from 'lodash';
import ThreeObjectBase from './base/ThreeObjectBase';

const CONFIG_DEFAULT = {
  color: 0xffffff,
  transparent: true,
  opacity: 0,
  scale: 100,
  isReceiveShadow: true,
};

export default class ThreeGround extends ThreeObjectBase {
  config: any;
  material: any;

  constructor(config = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.init();
  }

  init() {
    this.material = new THREE.MeshBasicMaterial({
      color: this.config.color,
      opacity: this.config.opacity,
      transparent: this.config.transparent,
    });
    this.obj = new THREE.Mesh(new THREE.PlaneGeometry(), this.material);
    this.obj.receiveShadow = this.config.isReceiveShadow;
    this.obj.rotateX(-Math.PI / 2);
    this.setScale(this.config.scale);
  }
}
