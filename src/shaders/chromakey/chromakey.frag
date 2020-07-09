precision mediump float;

uniform sampler2D texture;
uniform float difference;
varying vec2 vUv;

const vec3 chromaKeyColor = vec3(0.0, 1.0, 0.0);

void main(void){
    vec4 smpColor = texture2D(texture, vUv);
    float diff = length(chromaKeyColor - smpColor.rgb);
    if(diff < difference){
        discard;
    }else{
        gl_FragColor = smpColor;
    }
}