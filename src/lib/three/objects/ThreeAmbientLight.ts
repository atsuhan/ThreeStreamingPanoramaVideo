/**
 * Three.js : 環境光
 */

import _ from 'lodash';
import ThreeObjectBase from 'src/lib/three/objects/base/ThreeObjectBase';

const CONFIG_DEFAULT: any = {
  color: 0xffffff,
  force: 0.5,
};

export default class ThreeAmbientLight extends ThreeObjectBase {
  config: any;

  constructor(config: any = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.init();
  }

  init() {
    this.obj = new THREE.AmbientLight(this.config.color, this.config.force);
  }
}
