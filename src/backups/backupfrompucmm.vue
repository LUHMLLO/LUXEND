<template>
  <div id="visualizer">
    <Navbar class="p-absolute top left w-100" />

    <div id="visualizer-wrapper" class="h-100 w-100">
      <canvas id="threejs" class="vh:h-1000 vw:w-1000"></canvas>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
////////////////////////////////////////////////////////////////////////////////////////
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
//import { HalfFloatType } from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
//import { SSAOShader } from "three/examples/jsm/shaders/SSAOShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
////////////////////////////////////////////////////////////////////////////////////////
export default {
  name: "Visualizer",
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
      model_children: [],
      model_tv1: null,
      model_tv2: null
    };
  },
  created() {
    window.addEventListener("resize", this.onWindowsResize);
    window.addEventListener("pointermove", this.intersects_OnPointerMove, false);
    let self = this;
    window.addEventListener(
      "pointerdown",
      function () {
        self.zoomToSelection(self.obj);
      },
      false
    );
  },
  async mounted() {
    //let self = this;
    await this.createInstance();
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowsResize);
    window.location.reload();
  },
  computed: {
    DevicePixelRatio_G() {
      let ratio = 1;
      // To account for zoom, change to use deviceXDPI instead of systemXDPI
      if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
        // Only allow for values > 1
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
      this.canvas_wrapper = document.querySelector("#visualizer-wrapper");
      this.canvas = document.querySelector("#threejs");
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
      this.controls.enableRotate = true;
      this.controls.enableZoom = true;
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
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
    setSkybox: function () {
      let materialArray = [];
      const ceilingTexture = "ivan-bandura-bav73b2bp9o-unsplash.png";
      const wallsTexture = "concretewall4k.png";
      const wallSize = 8;
      const floorTexture = "bernard-hermant-qi-H70ga93s-unsplash.png";
      let texture_up = new THREE.TextureLoader().load("/assets/textures/" + ceilingTexture);
      texture_up.repeat.set(6, 6);
      texture_up.wrapS = THREE.RepeatWrapping;
      texture_up.wrapT = THREE.RepeatWrapping;
      texture_up.encoding = THREE.sRGBEncoding;
      let texture_dn = new THREE.TextureLoader().load("/assets/textures/" + floorTexture);
      texture_dn.repeat.set(16, 16);
      texture_dn.wrapS = THREE.RepeatWrapping;
      texture_dn.wrapT = THREE.RepeatWrapping;
      texture_dn.encoding = THREE.sRGBEncoding;
      let texture_ft = new THREE.TextureLoader().load("/assets/textures/" + wallsTexture);
      texture_ft.repeat.set(wallSize, wallSize);
      texture_ft.wrapS = THREE.RepeatWrapping;
      texture_ft.wrapT = THREE.RepeatWrapping;
      texture_ft.encoding = THREE.sRGBEncoding;
      let texture_bk = new THREE.TextureLoader().load("/assets/textures/" + wallsTexture);
      texture_bk.repeat.set(wallSize, wallSize);
      texture_bk.wrapS = THREE.RepeatWrapping;
      texture_bk.wrapT = THREE.RepeatWrapping;
      texture_bk.encoding = THREE.sRGBEncoding;
      let texture_rt = new THREE.TextureLoader().load("/assets/textures/" + wallsTexture);
      texture_rt.repeat.set(wallSize, wallSize);
      texture_rt.wrapS = THREE.RepeatWrapping;
      texture_rt.wrapT = THREE.RepeatWrapping;
      texture_rt.encoding = THREE.sRGBEncoding;
      let texture_lf = new THREE.TextureLoader().load("/assets/textures/" + wallsTexture);
      texture_lf.repeat.set(wallSize, wallSize);
      texture_lf.wrapS = THREE.RepeatWrapping;
      texture_lf.wrapT = THREE.RepeatWrapping;
      texture_lf.encoding = THREE.sRGBEncoding;
      materialArray.push(new THREE.MeshStandardMaterial({ map: texture_ft }));
      materialArray.push(new THREE.MeshStandardMaterial({ map: texture_bk }));
      materialArray.push(new THREE.MeshStandardMaterial({ map: texture_up }));
      materialArray.push(new THREE.MeshPhongMaterial({ map: texture_dn, specular: new THREE.Color("grey"), shininess: 25 }));
      materialArray.push(new THREE.MeshStandardMaterial({ map: texture_rt }));
      materialArray.push(new THREE.MeshStandardMaterial({ map: texture_lf }));
      for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.DoubleSide;
        materialArray[i].receiveShadow = true;
      }
      let skyboxGeo = new THREE.BoxGeometry(25, 10.5, 15);
      let skybox = new THREE.Mesh(skyboxGeo, materialArray);
      skybox.position.y = 3.5;
      skybox.receiveShadow = true;
      this.scene.add(skybox);
    },
    setfloor: function () {
      const geometry = new THREE.PlaneGeometry(30, 30, 1, 1);
      const texture = new THREE.TextureLoader().load("/assets/textures/floor.png");
      texture.repeat.set(9, 9);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.encoding = THREE.sRGBEncoding;
      const material = new THREE.MeshPhongMaterial({ map: texture, shininess: 0 });
      //material.opacity = 0.8;
      const floor = new THREE.Mesh(geometry, material);
      floor.material.side = THREE.DoubleSide;
      floor.rotation.x = -0.5 * Math.PI;
      floor.position.y = -1.75;
      floor.receiveShadow = true;
      this.scene.add(floor);
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
      const modelpath = "/assets/models/stand.glb";
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
              case "tv1":
                self.setTextures(child);
                break;
              case "tv2":
                self.setTextures(child);
                break;
              case "facultad":
                //console.log(child)
                break;
              case "carrera":
                //console.log(child)
                break;
              default:
                break;
            }
          });
          self.scene.add(self.model);
          //self.outlinePass.selectedObjects = self.model.children
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    },
    setTextures: function (child) {
      this.texture = new THREE.TextureLoader().load("https://pucmm-open-week.s3.us-east-2.amazonaws.com/middle_0ab3851b40.png");
      this.texture.encoding = THREE.sRGBEncoding;
      this.material = new THREE.MeshPhongMaterial({
        map: this.texture,
        shininess: 10
      });
      this.material.side = THREE.DoubleSide;
      this.material.map.needsUpdate = false;
      this.setMaterial(this.model, child.name, this.material);
    },
    setMaterial: function (parent, type, mtl) {
      parent.traverse((o) => {
        if (o.name == type) {
          o.traverse((child) => {
            if (child.isMesh) {
              child.material = mtl;
            }
          });
        }
      });
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
        await this.setSkybox(),
        await this.setPostProcessing(),
        await this.setModel(),
        this.animate();
    },
    centerModel: function (model) {
      model.updateMatrixWorld();
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize().length();
      const center = box.getCenter();
      model.position.x += model.position.x - center.x;
      model.position.y += model.position.y - center.y;
      model.position.z += model.position.z - center.z;
      // this.camera.position.copy(center);
      //this.camera.position.x += size / 20;
      this.camera.position.y += size / 10;
      this.camera.position.z += size;
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(center);
    },
    intersects_OnPointerMove: function (event) {
      event.preventDefault();
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      mouse.x = (event.clientX / this.canvas_wrapper.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / this.canvas_wrapper.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      this.intersects = raycaster.intersectObjects(this.model.children);
      this.obj;
      this.selectedObject = [];
      if (this.intersects.length > 0) {
        document.querySelector("html,body").style.cursor = "pointer";
        this.obj = this.intersects[0].object;
        this.selectedObject.push(this.obj);
      } else {
        document.querySelector("html,body").style.cursor = "default";
        this.obj = null;
      }
      this.outlineSelection(this.selectedObject);
    },
    outlineSelection: function (raycastedObject) {
      this.outlinePass.selectedObjects = raycastedObject;
    },
    zoomToSelection: function (raycastedObject, fitOffset = 2) {
      this.isZoomed = !this.isZoomed;
      if (this.isZoomed) {
        //console.log("lets zoom in")
        if (this.obj != null) {
          const box = new THREE.Box3();
          box.expandByObject(raycastedObject);
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
      } else {
        //console.log("lets zoom out");
        const box = new THREE.Box3();
        box.expandByObject(this.model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * this.camera.fov) / 360));
        const fitWidthDistance = fitHeightDistance / this.camera.aspect;
        const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);
        const direction = this.controls.target.clone().sub(this.camera.position).normalize().multiplyScalar(distance);
        this.controls.maxDistance = 5.5;
        this.controls.target.copy(center);
        this.camera.near = distance / 100;
        this.camera.far = distance * 100;
        this.camera.updateProjectionMatrix();
        this.camera.position.copy(this.controls.target).sub(direction);
        this.controls.update();
      }
    }
  }
};
</script>
