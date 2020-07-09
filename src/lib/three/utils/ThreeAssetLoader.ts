import _ from 'lodash';

export default class ThreeAssetLoader {
  // single
  Font = (path: string) =>
    new Promise((resolve) => {
      new THREE.FontLoader().load(path, resolve);
    });

  Texture = (path: string) =>
    new Promise((resolve) => {
      new THREE.TextureLoader().load(path, resolve);
    });

  Textures = (pathArr: Array<string>) => Promise.all(_.map(pathArr, async (path) => this.Texture(path)));

  Gltf = (path: string) =>
    new Promise((resolve) => {
      new THREE.GLTFLoader().load(path, (gltf: any) => {
        resolve(gltf);
      });
    });

  Gltfs = (pathArr: Array<string>) => Promise.all(_.map(pathArr, async (path) => this.Gltf(path)));
}
