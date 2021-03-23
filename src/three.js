
import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
//import { HalfFloatType } from "three";
//import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
//import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
//import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
//import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
//import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
//import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
//import { SSAOShader } from "three/examples/jsm/shaders/SSAOShader.js";
//import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";



const DevicePixelRatio_G = function () {
    const ratio = 1;
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
        ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
    }
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }
    return ratio;
}




///set canvas 
const canvas_wrapper = document.querySelector("#customizer-wrapper");
const canvas = document.querySelector("#customizer-canvas");


///set scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe8f5e9);


///set renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false,
    alpha: true
});
renderer.setPixelRatio(DevicePixelRatio_G());
renderer.setSize(canvas_wrapper.clientWidth, canvas_wrapper.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.autoClear = false;
canvas_wrapper.appendChild(renderer.domElement);


///set camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 25);


//set lights
scene.add(new THREE.HemisphereLight(0x546e7a, 0x546e7a, 1.25));

const dirLight = new THREE.DirectionalLight(0xcfd8dc, 1.75);
dirLight.position.set(-10, 10, 15);
dirLight.castShadow = true;
dirLight.shadow.bias = -0.0001;
dirLight.shadow.mapSize.width = 1024 * 4;
dirLight.shadow.mapSize.height = 1024 * 4;

scene.add(dirLight);



//set composer and postprocessing methods
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const outlinePass = new OutlinePass(
    new THREE.Vector2(canvas_wrapper.clientWidth, canvas_wrapper.clientHeight),
    scene,
    camera
);
outlinePass.visibleEdgeColor.set(0xf8f8f8);
outlinePass.hiddenEdgeColor.set(0x030303);
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 1;
outlinePass.edgeThickness = 1;
outlinePass.pulsePeriod = 5;
composer.addPass(outlinePass);

const effectFXAA = new ShaderPass(FXAAShader);
effectFXAA.uniforms["resolution"].value.x = 1 / (canvas_wrapper.clientWidth * DevicePixelRatio_G);
effectFXAA.uniforms["resolution"].value.y = 1 / (canvas_wrapper.clientHeight * DevicePixelRatio_G);
effectFXAA.renderToScreen = true;
composer.addPass(effectFXAA);

const smaapass = new SMAAPass(canvas_wrapper.clientWidth, canvas_wrapper.clientHeight);
smaapass.renderToScreen = true;
composer.addPass(smaapass);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(canvas_wrapper.clientWidth, canvas_wrapper.clientHeight), 0.1, 0, 0);
bloomPass.renderToScreen = true;
composer.addPass(bloomPass);

composer.addPass(new ShaderPass(GammaCorrectionShader));




// initialize animation
const animate = function () {
    requestAnimationFrame(animate);
    renderer.clear();
    composer.render();
    composer.render();
}

onWindowsResize = function () {
    camera.aspect = canvas_wrapper.clientWidth / canvas_wrapper.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas_wrapper.clientWidth, canvas_wrapper.clientHeight);
    composer.setSize(canvas_wrapper.clientWidth, canvas_wrapper.clientHeight);
}


animate();









