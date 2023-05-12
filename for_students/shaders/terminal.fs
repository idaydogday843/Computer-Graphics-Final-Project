varying vec2 v_uv;
varying vec3 v_normal;

const vec3 lightDirWorld = vec3(0,0,1);

uniform vec3 light;
uniform vec3 dark;

uniform float dots;

uniform float radius;
uniform float shine;

void main()
{
    vec3 nhat = normalize(v_normal);

    float lighting = abs(dot(nhat, lightDirWorld));
    vec3 diffuse = lighting * vec3(1.,1.,1.);

    float x = v_uv.x * dots;
    float y = v_uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float a = fwidth(d);
    float dc = 1.0 - smoothstep(0.25-a,0.25+a,d);

    vec3 darker = vec3(dark.x, clamp(dark.y + sin(x * 3.141), 0.0, 1.0), clamp(dark.z - sin(x * 3.141), 0.0, 1.0));
    gl_FragColor = vec4(mix(light,dark,dc) * diffuse, 1.); //* vec4(clamp(specular + diffuse, 0.0, 1.0), 1);;
}