import _ from 'lodash';
import ThreeObjectBase from './base/ThreeObjectBase';

const CONFIG_DEFAULT = {
  modelPath: `/models/sample.glb`,
  isReceiveShadow: true,
  isCastShadow: true,
};

const loadGltf = (url: string) =>
  new Promise((resolve) => {
    new THREE.GLTFLoader().load(url, (gltf: object) => {
      resolve(gltf);
    });
  });

export default class ThreeModel extends ThreeObjectBase {
  config: any;

  model: any;

  objs: any;

  constructor(config: any = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
  }

  async init() {
    this.model = await loadGltf(this.config.modelPath);
    this.objs = this.model.scene.children;
    this.obj = _.head(this.objs);
    this.obj.receiveShadow = this.config.isReceiveShadow;
    this.obj.castShadow = this.config.isCastShadow;
  }
}
