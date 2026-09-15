import{i as e,t}from"./jsx-runtime-Cx0BB4qO.js";import{n}from"./with-selector-NYD_k4aM.js";import{a as r,n as i,r as a,t as o}from"./client-canvas-C5vTqX3M.js";import{t as s}from"./utils-DojpP95n.js";import{U as c,Wr as l,ar as u,do as d,jr as f,mr as p,no as m,ro as h,sr as g,ta as _}from"./three.core-DtjtRha-.js";import{n as v,r as y,t as b}from"./OrbitControls-CwTi7Pwe.js";import{t as x}from"./lab-controls-BPBJydOj.js";import{a as S,t as C}from"./perf-C2k0vAUr.js";import{n as w}from"./use-media-DmDHQJkG.js";import{t as T}from"./lab-thumb-BvjPDhNL.js";var E={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},D={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},O=e(n()),k=O.forwardRef(({scale:e=10,frames:t=1/0,opacity:n=1,width:i=1,height:o=1,blur:s=1,near:l=0,far:p=10,resolution:m=512,smooth:h=!0,color:v=`#000000`,depthWrite:b=!1,renderOrder:x,...S},C)=>{let w=O.useRef(null),T=r(e=>e.scene),k=r(e=>e.gl),A=O.useRef(null);i*=Array.isArray(e)?e[0]:e||1,o*=Array.isArray(e)?e[1]:e||1;let[j,M,N,P,F,I,L]=O.useMemo(()=>{let e=new d(m,m),t=new d(m,m);t.texture.generateMipmaps=e.texture.generateMipmaps=!1;let n=new f(i,o).rotateX(Math.PI/2),r=new u(n),a=new g;a.depthTest=a.depthWrite=!1,a.onBeforeCompile=e=>{e.uniforms={...e.uniforms,ucolor:{value:new c(v)}},e.fragmentShader=e.fragmentShader.replace(`void main() {`,`uniform vec3 ucolor;
           void main() {
          `),e.fragmentShader=e.fragmentShader.replace(`vec4( vec3( 1.0 - fragCoordZ ), opacity );`,`vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );`)};let s=new _(E),l=new _(D);return l.depthTest=s.depthTest=!1,[e,n,a,r,s,l,t]},[m,i,o,e,v]),R=e=>{P.visible=!0,P.material=F,F.uniforms.tDiffuse.value=j.texture,F.uniforms.h.value=e*1/256,k.setRenderTarget(L),k.render(P,A.current),P.material=I,I.uniforms.tDiffuse.value=L.texture,I.uniforms.v.value=e*1/256,k.setRenderTarget(j),k.render(P,A.current),P.visible=!1},z=0,B,V;return a(()=>{A.current&&(t===1/0||z<t)&&(z++,B=T.background,V=T.overrideMaterial,w.current.visible=!1,T.background=null,T.overrideMaterial=N,k.setRenderTarget(j),k.render(T,A.current),R(s),h&&R(s*.4),k.setRenderTarget(null),w.current.visible=!0,T.overrideMaterial=V,T.background=B)}),O.useImperativeHandle(C,()=>w.current,[]),O.createElement(`group`,y({"rotation-x":Math.PI/2},S,{ref:w}),O.createElement(`mesh`,{renderOrder:x,geometry:M,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},O.createElement(`meshBasicMaterial`,{transparent:!0,map:j.texture,opacity:n,depthWrite:b})),O.createElement(`orthographicCamera`,{ref:A,args:[-i/2,i/2,o/2,-o/2,l,p]}))}),A=t();function j({slug:e,title:t,caption:n}){return(0,A.jsxs)(`div`,{className:`flex size-full flex-col items-center justify-center bg-void p-8`,children:[(0,A.jsx)(`div`,{className:`w-full max-w-lg overflow-hidden rounded-2xl border border-white/10`,children:(0,A.jsx)(`div`,{className:`aspect-[16/10] bg-trench`,children:(0,A.jsx)(T,{slug:e})})}),(0,A.jsxs)(`p`,{className:`mt-4 font-mono text-sm text-mist`,children:[`2D fallback · `,t,` · WebGL unavailable`]}),n&&(0,A.jsx)(`p`,{className:`mt-2 max-w-md text-center text-sm text-chalk/80`,children:n})]})}function M({pos:e,text:t,tone:n=`chalk`,occlude:r=!0,note:i}){let a=x(e=>e.labels),o=x(e=>e.layout),c=x(e=>e.inspect),l=x(e=>e.setInspect);if(!a)return null;let u={chalk:`text-chalk`,glacier:`text-glacier`,magma:`text-magma`,sandstone:`text-sandstone`,ice:`text-ice`,moss:`text-moss`,fault:`text-fault`},d=t.split(` · `)[0]??t,f=i??`${d} is a named part of this teaching model. Drive a slider or play; the geometry should change.`,p=c?.name===d;return(0,A.jsx)(v,{position:e,center:!0,occlude:r?`blending`:void 0,zIndexRange:o===`projector`?[20,0]:[10,0],style:{pointerEvents:`auto`},children:(0,A.jsx)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),l(p?null:{name:d,note:f})},className:s(`whitespace-nowrap rounded-full border bg-basalt/85 px-2.5 py-1 font-mono text-[11px] shadow-lg`,u[n],p?`border-glacier/60 text-glacier`:`border-white/15`),children:t})})}function N({pos:e=[0,2.2,0],children:t}){return x(e=>e.labels)?(0,A.jsx)(v,{position:e,center:!0,style:{pointerEvents:`none`,width:440},children:(0,A.jsx)(`div`,{className:`rounded-[16px] border border-white/10 bg-basalt/80 px-3 py-2 text-center font-mono text-[11px] text-chalk backdrop-blur-md`,children:t})}):null}function P({children:e}){return(0,A.jsx)(`div`,{className:`pointer-events-auto absolute right-3 top-[6.5rem] z-10 hidden flex-col gap-2 md:right-6 md:flex lg:top-[7.5rem]`,children:e})}function F({onClick:e,children:t,active:n}){return(0,A.jsx)(`button`,{type:`button`,onClick:e,className:s(`min-h-11 rounded-full border border-white/10 bg-basalt/70 px-3 py-2 text-left font-mono text-[11px] text-chalk backdrop-blur-xl`,n&&`border-glacier/40 text-glacier`),children:t})}function I({ambient:e=.28,keyIntensity:t=2.05}){return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`hemisphereLight`,{args:[`#9ec4d4`,`#1c1814`,.38]}),(0,A.jsx)(`ambientLight`,{intensity:e,color:`#c9d4d0`}),(0,A.jsx)(`directionalLight`,{position:[4.2,5.8,3.2],intensity:t,color:`#fff4e0`,castShadow:!0,"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-bias":-25e-5,"shadow-camera-near":.4,"shadow-camera-far":28,"shadow-camera-left":-9,"shadow-camera-right":9,"shadow-camera-top":9,"shadow-camera-bottom":-9}),(0,A.jsx)(`directionalLight`,{position:[-3.4,1.4,-2.4],intensity:.42,color:`#7fd4ff`}),(0,A.jsx)(`directionalLight`,{position:[.2,-2.4,4],intensity:.22,color:`#f4efe6`})]})}function L({minDistance:e=1.4,maxDistance:t=18,target:n=[0,.2,0]}){let r=x(e=>e.viewKey);return(0,A.jsx)(b,{enablePan:!1,enableDamping:!0,dampingFactor:.08,minDistance:e,maxDistance:t,maxPolarAngle:Math.PI*.9,target:n,makeDefault:!0},r)}function R({size:e=14}){let t=(0,O.useMemo)(()=>new p({color:`#0e1412`,roughness:.95,metalness:0}),[]);return(0,A.jsx)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[0,-.02,0],material:t,receiveShadow:!0,children:(0,A.jsx)(`circleGeometry`,{args:[e,64]})})}function z({positions:e}){let t=x(e=>e.step),n=(0,O.useMemo)(()=>new h,[]);return a(({camera:r})=>{let i=e[Math.min(t,e.length-1)]??e[0];i&&(n.set(i[0],i[1],i[2]),r.position.lerp(n,.04))}),null}function B({width:e,depth:t,y:n=.018,color:r=`#1a4a6e`,opacity:i=.78}){return(0,A.jsxs)(`mesh`,{rotation:[-Math.PI/2,0,0],position:[0,n,0],receiveShadow:!0,children:[(0,A.jsx)(`planeGeometry`,{args:[e,t,48,48]}),(0,A.jsx)(`meshPhysicalMaterial`,{color:r,roughness:.06,metalness:.06,transmission:.28,thickness:.55,ior:1.333,transparent:!0,opacity:i,envMapIntensity:.85})]})}function V({size:e,position:t,rotation:n=[0,0,0]}){return(0,A.jsxs)(`mesh`,{position:t,rotation:n,castShadow:!0,children:[(0,A.jsx)(`boxGeometry`,{args:[e[0],e[1],e[2],10,6,8]}),(0,A.jsx)(`meshPhysicalMaterial`,{color:`#d5eaf4`,roughness:.12,transmission:.42,thickness:1.15,ior:1.31,transparent:!0,opacity:.88,clearcoat:.35,clearcoatRoughness:.2})]})}function H({size:e,position:t,color:n=`#7C9A6A`}){let r=S(),i=(0,O.useMemo)(()=>new m(.55,.55),[]);return(0,A.jsxs)(`mesh`,{position:t,castShadow:!0,receiveShadow:!0,children:[(0,A.jsx)(`cylinderGeometry`,{args:[e[0]*.52,e[0]*.55,e[1],28,1]}),(0,A.jsx)(`meshStandardMaterial`,{color:n,roughness:.9,metalness:.03,normalMap:r,normalScale:i})]})}function U({from:e,to:t,color:n=`#3EE0C6`,radius:r=.03}){let{quat:i,mid:a,end:o,len:s}=(0,O.useMemo)(()=>{let n=new h(...e),r=new h(...t),i=r.clone().sub(n),a=Math.max(.05,i.length());return{quat:new l().setFromUnitVectors(new h(0,1,0),i.clone().normalize()),mid:n.clone().lerp(r,.42),end:r,len:a}},[e,t]);return(0,A.jsxs)(`group`,{children:[(0,A.jsxs)(`mesh`,{position:a,quaternion:i,children:[(0,A.jsx)(`cylinderGeometry`,{args:[r,r,s*.78,12]}),(0,A.jsx)(`meshStandardMaterial`,{color:n,roughness:.42,metalness:.08})]}),(0,A.jsxs)(`mesh`,{position:o,quaternion:i,children:[(0,A.jsx)(`coneGeometry`,{args:[r*2.4,s*.2,14]}),(0,A.jsx)(`meshStandardMaterial`,{color:n,roughness:.38,metalness:.08})]})]})}function W({slug:e,title:t,camera:n,children:r,fallback:a,liveText:s,exaggeration:c,minDistance:l,maxDistance:u,target:d,lights:f=!0}){let p=i(),m=w(),h=x(e=>e.playing),g=x(e=>e.trueScale),_=x(e=>e.setTrueScale),v=x(e=>e.inspect),y=x(e=>e.setInspect),b=C();return p?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(o,{camera:n??{position:[0,1.4,5.4],fov:40},dpr:b.dpr,frameloop:m&&!h?`demand`:`always`,shadows:b.shadows,children:[f&&(0,A.jsx)(I,{}),r,f&&b.shadows&&(0,A.jsx)(k,{opacity:.42,scale:18,blur:2.4,far:8,resolution:512,color:`#000000`}),(0,A.jsx)(L,{minDistance:l,maxDistance:u,target:d})]}),(0,A.jsx)(`p`,{className:`sr-only`,"aria-live":`polite`,children:s??t}),c&&(0,A.jsx)(`button`,{type:`button`,onClick:()=>_(!g),className:`pointer-events-auto absolute left-1/2 top-[4.6rem] z-10 -translate-x-1/2 rounded-full border border-white/10 bg-basalt/80 px-3 py-1 font-mono text-[10px] text-mist backdrop-blur-md hover:text-chalk`,children:g?`True scale · click for teaching exaggeration`:c}),v&&(0,A.jsx)(`div`,{className:`pointer-events-auto absolute bottom-28 left-1/2 z-10 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-basalt/85 px-4 py-3 backdrop-blur-xl`,children:(0,A.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`p`,{className:`font-mono text-[10px] uppercase tracking-[0.14em] text-glacier`,children:`Inspect`}),(0,A.jsx)(`p`,{className:`mt-1 font-medium text-chalk`,children:v.name}),(0,A.jsx)(`p`,{className:`mt-1 text-[12px] leading-5 text-mist`,children:v.note})]}),(0,A.jsx)(`button`,{type:`button`,className:`shrink-0 font-mono text-[11px] text-mist hover:text-chalk`,onClick:()=>y(null),children:`Close`})]})})]}):a??(0,A.jsx)(j,{slug:e,title:t,caption:s})}export{N as a,z as c,B as d,j as f,V as i,R as l,U as n,F as o,H as r,P as s,W as t,M as u};