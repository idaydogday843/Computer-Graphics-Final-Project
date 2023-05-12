varying vec2 v_uv; 
varying vec3 v_normal;
varying vec3 v_position;
uniform sampler2D colormap;

void main() {

    vec4 pos = (modelViewMatrix * vec4(position,1.0));
    
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * pos;
    
    // pass position to fragment shader
    v_position = pos.xyz;
    
    // compute the view-space normal and pass it to fragment shader
    v_normal = normalMatrix * normal;

    v_uv = uv;
}