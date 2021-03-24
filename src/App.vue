<template>
  <div id="app" class="w-100 vh:h-1000 overflow-hidden d-flex justify-center flex-column" :class="[theme.background.primary, theme.color.primary]">
    <!----------------------------------------------------------------------------------------------->
    <div class="d-flex overflow-hidden flex-grow-0 h-100">
      <!--------------------->
      <div class="vw:w-150 vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16 overflow-hidden overflow-y-scroll scrollbar-none">
        <!--------------------->

        <ul class="w-100 d-flex flex-column vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16 vw:mb-16" :class="[theme.background.faded]">
          <!--------------------->
          <li class="d-flex m-0 vw:pt-8 vw:pr-16 vw:pb-8 vw:pl-16" v-for="child in model_children" :key="child.index">
            <span class="vw:font-base cursor-pointer d-block uppercase m-auto ml-0 w-100" @pointerdown="setActiveOption(child)">
              {{ child.childID }}
            </span>
          </li>
          <!--------------------->
        </ul>

        <!--------------------->
      </div>
      <!--------------------->
      <div class="vw:w-700 vw:h-480 vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16 overflow-hidden">
        <div id="customizer-wrapper" class="w-100 h-100 overflow-hidden" :class="[theme.background.faded]">
          <canvas id="customizer-canvas" class="w-100 h-100"></canvas>
        </div>
      </div>
      <!--------------------->
      <div class="vw:w-150 vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16 overflow-hidden overflow-y-scroll scrollbar-none">
        <!--------------------->

        <ul class="w-100 d-flex flex-column vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16 mb-16" :class="[theme.background.faded]">
          <!--------------------->
          <li class="d-flex m-0 vw:pt-8 vw:pr-8 vw:pb-8 vw:pl-8" v-for="Mtexture in material_textures" :key="Mtexture.index">
            <span
              class="cursor-pointer d-block uppercase m-auto ml-0 w-100 bg-red vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16"
              :style="[{ background: 'url(' + Mtexture.texture + ')' }]"
              @pointerdown="setTexture(Mtexture)"
            ></span>
          </li>
          <!--------------------->
        </ul>

        <!--------------------->

        <ul class="w-100 d-flex flex-column vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16 mb-16" :class="[theme.background.faded]">
          <!--------------------->
          <li class="d-flex m-0 vw:pt-8 vw:pr-8 vw:pb-8 vw:pl-8" v-for="Mcolor in material_colors" :key="Mcolor.index">
            <span
              class="cursor-pointer d-block uppercase m-auto ml-0 w-100 bg-red vw:pt-16 vw:pr-16 vw:pb-16 vw:pl-16"
              :style="[{ background: '#' + Mcolor.color }]"
              @pointerdown="setColor(Mcolor)"
            ></span>
          </li>
          <!--------------------->
        </ul>

        <!--------------------->
      </div>
      <!--------------------->
    </div>
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
      material_textures: [
        {
          texture: "/assets/textures/tim-mossholder-V6KKk5LCfI0-unsplash.jpg",
          size: [3, 3, 3],
          shininess: 0
        },
        {
          texture: "/assets/textures/diego-passadori-e6frrz-kh-0-unsplash.jpg",
          size: [3, 3, 3],
          shininess: 0
        },
        {
          texture: "/assets/textures/04.jpg",
          size: [3, 3, 3],
          shininess: 0
        },
        {
          texture: "/assets/textures/05.jpg",
          size: [3, 3, 3],
          shininess: 0
        },
        {
          texture: "/assets/textures/06.jpg",
          size: [4, 4, 4],
          shininess: 0
        }
      ],
      material_colors: [
        { color: "F44336" },
        { color: "e91e63" },
        { color: "9c27b0" },
        { color: "673ab7" },
        { color: "3f51b5" },
        { color: "2196F3" },
        { color: "03a9f4" },
        { color: "00bcd4" },
        { color: "009688" },
        { color: "4CAF50" },
        { color: "8bc34a" },
        { color: "cddc39" },
        { color: "ffeb3b" },
        { color: "ffc107" },
        { color: "ff9800" },
        { color: "ff5722" },
        { color: "795548" },
        { color: "607d8b" },
        { color: "9e9e9e" },
        { color: "FFFFFF" },
        { color: "000000" }
      ],
      modelpath: null,
      model: null,
      model_children: [],
      activeOption: ""
    };
  },
  created() {
    window.addEventListener("resize", this.onWindowsResize);
  },
  async mounted() {
    await this.getModelsFromWordpress();
    this.createInstance();
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
    getModelsFromWordpress: async function () {
      await this.$axios({
        method: "GET",
        url: "http://www.luxend.net/wp-json/wp/v2/modelos"
      })
        .then((modelo) => {
          console.log(modelo.data[0].acf.onlyfortesturl);
          this.modelpath = modelo.data[0].acf.onlyfortesturl;
        })
        .catch((error) => {
          console.error("$http:ajax:catch", error);
        });
    },
    setCanvas: function () {
      this.canvas_wrapper = document.querySelector("#customizer-wrapper");
      this.canvas = document.querySelector("#customizer-canvas");
    },
    setScene: function () {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("#c87c87");
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
      this.controls.enableRotate = true;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      //this.controls.dampingFactor = 0.5;
      //this.controls.rotateSpeed = 0.5;
      this.controls.minPolarAngle = Math.PI / 5;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.maxAzimuthAngle = Math.PI * 0.3;
      this.controls.minAzimuthAngle = -Math.PI * 0.3;
      this.controls.minDistance = 1.6; //2
      this.controls.maxDistance = 3; //5
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
      this.outlinePass.visibleEdgeColor.set("#000000");
      this.outlinePass.hiddenEdgeColor.set("#000000");
      this.outlinePass.edgeStrength = 5;
      this.outlinePass.edgeGlow = 5;
      this.outlinePass.edgeThickness = 5;
      this.outlinePass.pulsePeriod = 5;
      this.outlinePass.renderToScreen = true;
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
      loader.load(
        this.modelpath,
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
      console.log(window.innerWidth);
      this.DevicePixelRatio_G;
      this.camera.aspect = this.canvas_wrapper.clientWidth / this.canvas_wrapper.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
      this.composer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
    },
    createInstance: async function () {
      await this.setCanvas();
      await this.setScene();
      await this.setRender();
      await this.setCamera();
      await this.setControls();
      await this.setLights();
      await this.setPostProcessing();
      await this.setModel();
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
      model.rotation.y = Math.PI;
      this.camera.position.copy(center);
      this.camera.position.x += 0;
      this.camera.position.y += size / 10;
      this.camera.position.z += size;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(center);
    },

    setActiveOption: function (child) {
      this.activeOption = child.childID;
      this.zoomToSelectedObject(child);
    },
    setTexture: function (material) {
      let new_texture = new THREE.TextureLoader().load(material.texture);
      new_texture.repeat.set(material.size[0], material.size[1], material.size[2]);
      new_texture.wrapS = THREE.RepeatWrapping;
      new_texture.wrapT = THREE.RepeatWrapping;
      new_texture.encoding = THREE.sRGBEncoding;

      const new_material = new THREE.MeshPhongMaterial({
        map: new_texture,
        shininess: 10
      });

      this.model.traverse((o) => {
        if (o.isMesh && o.nameID != null) {
          //console.log(o);
          if (o.nameID == this.activeOption) {
            //console.log(o.material);
            o.material = new_material;
          }
        }
      });
    },

    setColor: function (material) {
      const new_material = new THREE.MeshPhongMaterial({
        color: parseInt("0x" + material.color),
        shininess: 10
      });
      new_material.encoding = THREE.sRGBEncoding;

      this.model.traverse((o) => {
        if (o.isMesh && o.nameID != null) {
          //console.log(o);
          if (o.nameID == this.activeOption) {
            //console.log(o.material);
            o.material = new_material;
          }
        }
      });
    },

    zoomToSelectedObject: function (selectedObjectToZoomIn, fitOffset = 2) {
      this.model.traverse((o) => {
        if (o.isMesh) {
          if (o.name.includes(selectedObjectToZoomIn.childID)) {
            this.outlinePass.selectObject = o;
            const box = new THREE.Box3();
            box.expandByObject(o);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxSize = Math.max(size.x, size.y, size.z);
            const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * this.camera.fov) / 360));
            const fitWidthDistance = fitHeightDistance / this.camera.aspect;
            const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);
            const direction = this.controls.target.clone().sub(this.camera.position).normalize().multiplyScalar(distance);
            this.controls.maxDistance = distance * 0;
            this.controls.target.copy(center);
            this.camera.near = distance / 100;
            this.camera.far = distance * 100;
            this.camera.updateProjectionMatrix();
            this.camera.position.copy(this.controls.target).sub(direction);
            this.controls.update();
          }
        }
      });
    }
  }
};
</script>

