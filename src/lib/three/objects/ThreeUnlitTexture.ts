import _ from 'lodash';
import ThreeObjectBase from './base/ThreeObjectBase';

const CONFIG_DEFAULT = {
  texPath: `/img/logo.jpg`,
  isTransparent: true,
  isReceiveShadow: true,
};

export default class ThreeUnlitTexture extends ThreeObjectBase {
  config: any;
  texture: any;

  constructor(config: any = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
  }

  async init() {
    const geometory: any = new THREE.PlaneGeometry();

    this.texture = await new THREE.TextureLoader().load(this.config.texPath);

    const material = await new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: this.config.isTransparent,
      DoubleSide: THREE.DoubleSide,
      receiveShadow: this.config.isReceiveShadow,
    });

    this.obj = await new THREE.Mesh(geometory, material);
    this.obj.receiveShadow = this.config.receiveShadow;
  }

  setScaleAspect(widthScale: number) {
    const aspectRatio = this.texture.image.height / this.texture.image.width;
    const scaleVec = new THREE.Vector3(widthScale, widthScale * aspectRatio, 1);
    this.obj.scale.copy(scaleVec);
  }
}
