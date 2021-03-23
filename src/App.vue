<template>
  <div id="app" class="w-100 vh:h-1000 overflow-hidden d-flex justify-center flex-column" :class="[theme.background.primary, theme.color.primary]">
    <!----------------------------------------------------------------------------------------------->

    <!--------------------->
    <div class="d-flex overflow-hidden flex-grow-0 height-500">
      <!--------------------->
      <div class="w-20 h-100 p-16">
        <div class="w-100 h-100" :class="[theme.background.faded]"></div>
      </div>
      <!--------------------->
      <div class="w-80 h-100 p-16">
        <div id="customizer-wrapper" class="w-100 h-100" :class="[theme.background.faded]">
          <canvas id="customizer-canvas" class="w-100 h-100"></canvas>
        </div>
      </div>
      <!--------------------->
    </div>
    <!--------------------->
    <div class="d-flex overflow-hidden flex-grow-0 height-180">
      <div class="w-100 h-100 p-16">
        <div class="w-100 h-100" :class="[theme.background.faded]"></div>
      </div>
    </div>
    <!--------------------->
    <!----------------------------------------------------------------------------------------------->
  </div>
</template>

<script>
////////////////////////////////////////////////////////////////////////////////////////
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
////////////////////////////////////////////////////////////////////////////////////////
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
////////////////////////////////////////////////////////////////////////////////////////
export default {
  name: "App",
  data() {
    return {
      canvas_wrapper: null,
      canvas: null,
      scene: null,
      renderer: null,
      camera: null,
      controls: null,
      dirLight: null,
      spotLight: null,
      composer: null,
      outlinePass: null,
      intersects: null,
      obj: null,
      selectedObject: null,
      isZoomed: false,
      texture: null,
      material: null,
      model: null,
      model_children: []
    };
  },
  created() {
    window.addEventListener("resize", this.onWindowsResize);
  },
  async mounted() {
    await this.createInstance();
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowsResize);
    window.location.reload();
  },
  computed: {
    DevicePixelRatio_G() {
      let ratio = 1;
      if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
        ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
      }
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      }
      return ratio;
    }
  },
  methods: {
    setCanvas: function () {
      this.canvas_wrapper = document.querySelector("#customizer-wrapper");
      this.canvas = document.querySelector("#customizer-canvas");
    },
    setScene: function () {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xe8f5e9);
    },
    setRender: function () {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
        alpha: true
      });
      this.renderer.setPixelRatio(this.DevicePixelRatio_G);
      this.renderer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ReinhardToneMapping;
      this.renderer.toneMappingExposure = 1.5;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.autoClear = false;
      this.canvas_wrapper.appendChild(this.renderer.domElement);
    },
    setCamera: function () {
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 25);
    },
    setControls: function () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableRotate = false;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.enableDamping = false;
      this.controls.dampingFactor = 0.5;
      //this.controls.rotateSpeed = 0.5;
      this.controls.minPolarAngle = Math.PI / 2;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.maxAzimuthAngle = Math.PI * 0.3;
      this.controls.minAzimuthAngle = -Math.PI * 0.3;
      this.controls.minDistance = 2; //2
      this.controls.maxDistance = 5.5; //5
      //this.controls.mouseButtons = {RIGHT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, LEFT: THREE.MOUSE.RIGHT};
    },
    setLights: function () {
      this.scene.add(new THREE.HemisphereLight(0x546e7a, 0x546e7a, 1.25));
      this.dirLight = new THREE.DirectionalLight(0xcfd8dc, 1.75);
      this.dirLight.position.set(-10, 10, 15);
      this.dirLight.castShadow = true;
      this.dirLight.shadow.bias = -0.0001;
      this.dirLight.shadow.mapSize.width = 1024 * 4;
      this.dirLight.shadow.mapSize.height = 1024 * 4;
      this.scene.add(this.dirLight);
    },
    setPostProcessing: function () {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.outlinePass = new OutlinePass(
        new THREE.Vector2(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight),
        this.scene,
        this.camera
      );
      this.outlinePass.visibleEdgeColor.set(0xf8f8f8);
      this.outlinePass.hiddenEdgeColor.set(0x030303);
      this.outlinePass.edgeStrength = 5;
      this.outlinePass.edgeGlow = 1;
      this.outlinePass.edgeThickness = 1;
      this.outlinePass.pulsePeriod = 5;
      this.composer.addPass(this.outlinePass);
      const effectFXAA = new ShaderPass(FXAAShader);
      effectFXAA.uniforms["resolution"].value.x = 1 / (this.canvas_wrapper.clientWidth * this.DevicePixelRatio_G);
      effectFXAA.uniforms["resolution"].value.y = 1 / (this.canvas_wrapper.clientHeight * this.DevicePixelRatio_G);
      effectFXAA.renderToScreen = true;
      this.composer.addPass(effectFXAA);
      const smaapass = new SMAAPass(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
      smaapass.renderToScreen = true;
      this.composer.addPass(smaapass);
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight), 0.1, 0, 0);
      bloomPass.renderToScreen = true;
      this.composer.addPass(bloomPass);
      this.composer.addPass(new ShaderPass(GammaCorrectionShader));
    },
    setModel: function () {
      let self = this;
      const loader = new GLTFLoader();
      const modelpath = "/assets/models/testingmodel.glb";
      loader.load(
        modelpath,
        function (obj) {
          self.model = obj.scene;
          self.centerModel(self.model);

          self.model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material.map) child.material.map.anisotropy = 16;
            }
          });

          self.model.traverse((child) => {
            switch (child.name) {
              case "Scene":
                break;
              case "":
                break;
              case null:
                break;
              case "SketchUp":
                break;
              case "skp_camera_Last_Saved_SketchUp_View":
                break;
              case "skp_camera_Scene_1":
                break;
              case "skp_camera_Scene_2":
                break;
              default:
                self.model_children.push({
                  childID: child.name,
                  mtl: new THREE.MeshStandardMaterial({ color: 0xf8f8f8 }),
                  children: child.children
                });
            }
          });

          function initColor(parent, type, mtl) {
            parent.traverse((o) => {
              if (o.isMesh) {
                if (o.name.includes(type)) {
                  o.material = mtl;
                  o.nameID = type;
                }
              }
            });
          }

          for (let object of self.model_children) {
            initColor(self.model, object.childID, object.mtl);
          }

          self.scene.add(self.model);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.renderer.clear();
      this.composer.render();
      this.composer.render();
      this.controls.update();
    },
    onWindowsResize: function () {
      this.camera.aspect = this.canvas_wrapper.clientWidth / this.canvas_wrapper.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
      this.composer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
    },
    createInstance: async function () {
      await this.setCanvas(),
        await this.setScene(),
        await this.setRender(),
        await this.setCamera(),
        await this.setControls(),
        await this.setLights(),
        await this.setPostProcessing(),
        await this.setModel(),
        this.animate();
    },
    centerModel: function (model) {
      model.updateMatrixWorld();
      const center = new THREE.Vector3();
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize().length();
      box.getCenter(center);
      model.position.x += model.position.x - center.x;
      model.position.y += model.position.y - center.y;
      model.position.z += model.position.z - center.z;
      this.camera.position.y += size / 10;
      this.camera.position.z += size;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(center);
    }
  }
};
</script>

