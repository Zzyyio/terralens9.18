import{i as e,t}from"./jsx-runtime-Cx0BB4qO.js";import{n}from"./with-selector-NYD_k4aM.js";import{r}from"./client-canvas-C5vTqX3M.js";import{A as i,An as a,Ln as o,Mn as s,Qi as c,j as l,ro as u,tr as d}from"./three.core-DtjtRha-.js";import{i as f,s as p,t as m}from"./perf-C2k0vAUr.js";import{s as h}from"./geo-DijrJbw_.js";var g=e(n(),1),_=t(),v=`/textures/earth-day.jpg`,y=`/textures/earth-night.jpg`,b=`/textures/earth-bump.jpg`,x=`
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosW = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,S=`
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D bumpMap;
  uniform vec3 sunDirection;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 n = normalize(vNormalW);
    float ndl = dot(n, normalize(sunDirection));
    float dayF = smoothstep(-0.08, 0.22, ndl);
    vec3 day = texture2D(dayMap, vUv).rgb;
    vec3 night = texture2D(nightMap, vUv).rgb * 1.35;
    night *= (1.0 - dayF);
    vec3 color = mix(night, day, dayF);
    float bump = texture2D(bumpMap, vUv).r;
    color *= 0.88 + bump * 0.22;
    vec3 view = normalize(cameraPosition - vPosW);
    float fresnel = pow(1.0 - max(dot(n, view), 0.0), 2.2);
    color += vec3(0.28, 0.58, 0.9) * fresnel * 0.34;
    float spec = pow(max(dot(reflect(-normalize(sunDirection), n), view), 0.0), 22.0);
    color += vec3(0.6, 0.75, 0.95) * spec * dayF * 0.26;
    gl_FragColor = vec4(color, 1.0);
  }
`;function C({sunDirection:e=new u(4,.4,2),radius:t=1,segments:n,clouds:i=!1}){let a=p(v),o=p(y),s=p(b),l=m(),d=n??l.sphere,f=(0,g.useRef)(null),h=(0,g.useRef)(e);h.current=e,(0,g.useMemo)(()=>{a.colorSpace=c,o.colorSpace=c,a.anisotropy=16,o.anisotropy=16,s.anisotropy=8},[a,o,s]);let C=(0,g.useMemo)(()=>({dayMap:{value:a},nightMap:{value:o},bumpMap:{value:s},sunDirection:{value:e.clone()}}),[a,o,s]);return r(()=>{f.current&&f.current.uniforms.sunDirection.value.copy(h.current)}),(0,_.jsxs)(`group`,{children:[(0,_.jsxs)(`mesh`,{children:[(0,_.jsx)(`sphereGeometry`,{args:[t,d,d]}),(0,_.jsx)(`shaderMaterial`,{ref:f,vertexShader:x,fragmentShader:S,uniforms:C})]}),i&&(0,_.jsx)(w,{radius:t*1.012})]})}function w({radius:e=1.012}){let t=f(),n=m(),i=(0,g.useRef)(null);return r((e,t)=>{i.current&&(i.current.rotation.y+=Math.min(t,.1)*.004)}),(0,_.jsxs)(`mesh`,{ref:i,children:[(0,_.jsx)(`sphereGeometry`,{args:[e,n.sphere,n.sphere]}),(0,_.jsx)(`meshStandardMaterial`,{map:t,transparent:!0,opacity:.55,depthWrite:!1,roughness:1,metalness:0})]})}function T({radius:e=1.035}){let t=m();return(0,_.jsxs)(`mesh`,{children:[(0,_.jsx)(`sphereGeometry`,{args:[e,t.sphere,t.sphere]}),(0,_.jsx)(`shaderMaterial`,{transparent:!0,depthWrite:!1,side:1,vertexShader:`
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }
        `,fragmentShader:`
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            vec3 view = normalize(cameraPosition - vWorld);
            float f = pow(1.0 - max(dot(normalize(vNormal), view), 0.0), 2.6);
            gl_FragColor = vec4(0.32, 0.68, 1.0, clamp(f * 0.72, 0.0, 0.55));
          }
        `})]})}function E({radius:e=1.18,tiltDeg:t=23.44}){let n=(0,g.useMemo)(()=>{let t=new l().setFromPoints([new u(0,-e,0),new u(0,e,0)]),n=new s({color:16052198,transparent:!0,opacity:.85});return new a(t,n)},[e]);return(0,_.jsxs)(`group`,{rotation:[0,0,d.degToRad(t)],children:[(0,_.jsx)(`primitive`,{object:n}),(0,_.jsxs)(`mesh`,{position:[0,e,0],children:[(0,_.jsx)(`sphereGeometry`,{args:[.028,16,16]}),(0,_.jsx)(`meshBasicMaterial`,{color:`#7FD4FF`})]})]})}function D({lat:e,lon:t,radius:n=1.01,color:r=`#3EE0C6`}){let i=(0,g.useMemo)(()=>h(e,t,n),[e,t,n]);return(0,_.jsxs)(`mesh`,{position:i,children:[(0,_.jsx)(`sphereGeometry`,{args:[.016,12,12]}),(0,_.jsx)(`meshBasicMaterial`,{color:r})]})}function O({radius:e=1.004}){let t=(0,g.useMemo)(()=>{let t=[];for(let n=-60;n<=60;n+=30)for(let r=-180;r<180;r+=3)t.push(h(n,r,e)),t.push(h(n,r+3,e));for(let n=-180;n<180;n+=30)for(let r=-80;r<80;r+=3)t.push(h(r,n,e)),t.push(h(r+3,n,e));let n=new l().setFromPoints(t),r=new s({color:9149079,transparent:!0,opacity:.32});return new o(n,r)},[e]);return(0,_.jsx)(`primitive`,{object:t})}function k({count:e}){let t=m(),n=e??t.stars,r=(0,g.useMemo)(()=>{let e=new Float32Array(n*3);for(let t=0;t<n;t++){let n=28+Math.random()*40,r=Math.random()*Math.PI*2,i=Math.acos(2*Math.random()-1);e[t*3]=n*Math.sin(i)*Math.cos(r),e[t*3+1]=n*Math.sin(i)*Math.sin(r),e[t*3+2]=n*Math.cos(i)}return e},[n]),a=(0,g.useMemo)(()=>{let e=new l;return e.setAttribute(`position`,new i(r,3)),e},[r]);return(0,_.jsx)(`points`,{geometry:a,children:(0,_.jsx)(`pointsMaterial`,{color:`#F4EFE6`,size:.045,sizeAttenuation:!0})})}export{C as a,w as i,E as n,O as o,D as r,k as s,T as t};