import _ from 'lodash';
import vertexShader from 'src/shaders/chromakey/chromakey.vert';
import fragmentShader from 'src/shaders/chromakey/chromakey.frag';
import ThreeObjectBase from './base/ThreeObjectBase';

const CONFIG_DEFAULT = {
  videoElClassName: `video`,
  transparent: true,
  receiveShadow: true,
  difference: 0.7,
};

export default class ThreeVideoPlane extends ThreeObjectBase {
  config: any;

  elm: any;

  constructor(config: any = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
  }

  async init() {
    const geometory: any = new THREE.PlaneGeometry();

    this.elm = document.querySelector(this.config.videoElClassName);
    const texture: any = await new THREE.VideoTexture(this.elm);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        texture: {
          value: texture,
        },
        difference: {
          value: this.config.difference,
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      DoubleSide: THREE.DoubleSide,
    });

    this.obj = new THREE.Mesh(geometory, material);
    this.obj.receiveShadow = this.config.receiveShadow;
  }

  setScaleAspect(widthScale: number) {
    const aspectRatio = this.elm.videoHeight / this.elm.videoWidth;
    const scaleVec = new THREE.Vector3(widthScale, widthScale * aspectRatio, 1);
    this.obj.scale.copy(scaleVec);
  }

  play() {
    this.elm.play();
  }
}
