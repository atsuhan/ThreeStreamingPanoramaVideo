/**
 * Three.js : 平行光
 */

import _ from 'lodash';
import ThreeObjectBase from './base/ThreeObjectBase';

const CONFIG_DEFAULT: any = {
  color: 0xffffff,
  force: 1,
  isCastShadow: true,
  shadowMapWidth: 2048,
  shadowMapHeight: 2048,
};

export default class ThreeDirectionalLight extends ThreeObjectBase {
  config: any;

  constructor(config: any) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.init();
  }

  init() {
    this.obj = new THREE.DirectionalLight(this.config.color, this.config.force);
    this.obj.shadow.mapSize.width = this.config.shadowMapWidth;
    this.obj.shadow.mapSize.height = this.config.shadowMapHeight;
    this.obj.castShadow = this.config.isCastShadow;
  }
}
