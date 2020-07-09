import _ from 'lodash';
import ThreeObjectBase from '../../base/ThreeObjectBase';
import ThreeUnlitTexture from '../../ThreeUnlitTexture';
import { TweenMax, TimelineMax, Power2 } from 'gsap';

const DECORATION_PATH_DIR = {
  inner: `/img/webar/mv/decorations/TRIANGLE_FILL.png`,
  outer: `/img/webar/mv/decorations/TRIANGLE_FRAME.png`,
};

export default class ThreeDecorationTriangle extends ThreeObjectBase {
  children: { [key: string]: any } = {};
  maxSize = 0.1;

  async init() {
    this.obj = new THREE.Group();

    await Promise.all(
      _.map(DECORATION_PATH_DIR, async (texPath, key) => {
        this.children[key] = new ThreeUnlitTexture({ texPath });
        await this.children[key].init();
        this.children[key].addTo(this.obj);
        if (key === `inner`) this.children[key].move(new THREE.Vector3(0, 0, 0.01));
      })
    );
    this.animate();
  }

  setScaleAspect(widthScale: number) {
    this.children.inner.setScaleAspect(widthScale);
    this.children.outer.setScaleAspect(widthScale);
  }

  animate = () => {
    const outerScaleAnim = new TimelineMax({ repeat: -1 });
    outerScaleAnim
      .set(this.children.outer.obj.scale, { x: 0, y: 0, z: 0 })
      .to(this.children.outer.obj.scale, 0.6, {
        x: this.maxSize,
        y: this.maxSize,
        z: 1,
        ease: Power2.easeOut,
        delay: 0.1,
      })
      .to(this.children.outer.obj.scale, 0.3, {
        x: 0,
        y: 0,
        z: 1,
        ease: Power2.easeOut,
        delay: 1.1,
        onComplete: () => {
          this.maxSize = _.random(0.1, 0.2, true);
          super.move(new THREE.Vector3(_.random(-1, 1, true), _.random(0.2, 1, true), _.random(-1, 1, true)));
        },
      });

    const innerScaleAnim = new TimelineMax({ repeat: -1 });
    innerScaleAnim
      .set(this.children.inner.obj.scale, { x: 0, y: 0, z: 0 })
      .to(this.children.inner.obj.scale, 0.6, {
        x: this.maxSize,
        y: this.maxSize,
        z: 1,
        ease: Power2.easeOut,
        delay: 0.8,
      })
      .to(
        this.children.inner.obj.scale,
        0.3,
        {
          x: 0,
          y: 0,
          z: 1,
          ease: Power2.easeOut,
          delay: 0.1,
        },
        `+=0.3`
      );

    const rotationAnim = new TimelineMax({ repeat: -1 });
    rotationAnim.set(this.obj.rotation, { z: 0 }).to(
      this.obj.rotation,
      0.6,
      {
        z: -Math.PI,
        ease: Power2.easeOut,
        delay: 1.0,
      },
      `+=0.5`
    );

    outerScaleAnim.play();
    innerScaleAnim.play();
    rotationAnim.play();
  };
}
