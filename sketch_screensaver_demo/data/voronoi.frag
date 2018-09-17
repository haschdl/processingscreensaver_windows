/*
 * Voronoi visualization
 * Copy of the first approach by @The_ArtOfCode, shown at https://www.youtube.com/watch?v=l-07BXzNdPw
 * 
 * Shader from ShaderToy into Processing requires the following changes: 
 *   - main function is void main(void)
 *   - Replace fragCoord with gl_FragCoord
 *   - Replace fragColor with gl_FragColor 
 *   - "iResolution", "iTime" => must be declared in shader and set from Java code:   myShader.set("iResolution", float(width), float(height));  
 * 27.07.2018
 */

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define M_PI 3.1415926535897932384626433832795
#define HALF_PI 1.5707963267948966192313216916398

#define PROCESSING_TEXTURE_SHADER


uniform sampler2D texture;
uniform vec2 iResolution;

uniform float iTime;
uniform float n_points;
uniform float fillRate;

uniform vec3 baseColor;



vec2 N22(vec2 p) {
    vec3 a = fract(p.xyx*vec3(123.34,234.34,345.65));
    a += dot(a, a+34.45);
    return fract(vec2(a.x*a.y, a.y * a.z));    
}

void main() {
    // Normalized pixel coordinates (from 0 to 1)
    float ar = iResolution.x/iResolution.y;
    vec2 uv = (2. * gl_FragCoord.xy - iResolution.xy)/iResolution.y;
    
    float m = 0.;
    float t = iTime;
    float minDist = 100.;
    
    for(float i=1.; i<=n_points; i++) {
     vec2 n = N22(vec2(i));   
        vec2 p = vec2(sin(n.x*t) * fillRate ,sin(n.y*t)/ar* fillRate);
        p.x *= ar; //aspect ratio
        
        float d = length(uv-p);
        m+= smoothstep(.02, .01,d);
        
        if(d<minDist) {
         minDist = d;   
            
        }
    }   
    
    //vec3 col = vec3(m); //m shows the points
    vec3 col = vec3(pow(minDist, 0.4));
    vec3 red = vec3(1.0,0,0);

    gl_FragColor = vec4(mix(baseColor, vec3(1.0), col.r),1.0);
}