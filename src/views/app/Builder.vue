<template>
    <div id="builder" class="row overflow-hidden">
        <div class="col-12 p-0 height-500">
            <div id="canvas_wrapper" class="bg-white w-100 h-100">
                <canvas id="canvas" class="w-100 h-100"></canvas>
            </div>
        </div>
        <div class="col-12 row" :class="[theme.primary_background,theme.primary_color]">
            <section class="col-12">
                <i class="uil uil-camera font-base mr-15 cursor-pointer" @pointerdown="screenshot"></i>
                <i class="uil uil-save font-base cursor-pointer" @pointerdown="save"></i>
            </section>
            <section class="col-4 sm:col-12">
                <h6 class="mb-5 font-sm mt-0">Opciones</h6>
                <div class="row w-100">
                    <div class="col-6 flex-grow-1 flex-shrink-0 p-1 d-inline-flex content-center justify-center overflow-hidden" v-for="(child,index) in computed_childs" :key="index">
                        <button class="w-100 font-sm m-0 height-50 border border-white-fade-1 cursor-pointer" :class="[theme.primary_color,theme.secondary_background,theme.radius]">
                            {{child.childID}}
                        </button>
                    </div>
                </div>
            </section>
            <section class="col-4 sm:col-12">
                <h6 class="mb-5 font-sm mt-0">Texturas</h6>
                <div class="row w-100">
                    <div class="col-3 flex-grow-1 p-1 d-inline-flex content-center justify-center overflow-hidden" v-for="(material,index) in material_textures" :key="index">
                        <button class="border border-white-fade-1 cursor-pointer w-100 height-50 overflow-hidden" :class="[theme.radius]" :style="[{'background' : 'url('+material.texture+')'}]"/>
                    </div>
                </div>
            </section>
            <section class="col-4 sm:col-12">
                <h6 class="mb-5 font-sm mt-0">Colores</h6>
                <div class="row w-100">
                    <div class="col-3 flex-grow-1 p-1 d-inline-flex content-center justify-center overflow-hidden" v-for="(material,index) in material_colors" :key="index">
                        <button class="border border-white-fade-1 cursor-pointer w-100 height-50 overflow-hidden" :class="[theme.radius]" :style="[{'background' : '#'+material.color}]"/>
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { HalfFloatType } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { BloomEffect, EffectComposer, EffectPass, RenderPass} from "postprocessing";
export default {
    name: 'Visualizer',
    data(){
        return{
            canvasDimension: null,
            canvas_wrapper: null,
            canvas: null,
            scene: null,
            renderer: null,
            camera: null,
            controls: null,
            hemisphereLight: null,
            dirLight: null,
            spotLight: null,
            composer: null,
            texture: null,
            material: null,
            model: null,
            model_blob: null,
            model_children: [],
            //modelpath: "https://luxend.s3.us-east-2.amazonaws.com/chair_e60fbe28b1.glb"
            modelpath: "/assets/models/luxend.glb",
            materials: [
                {
                    texture: '/assets/textures/tim-mossholder-V6KKk5LCfI0-unsplash.jpg',
                    size: [3,3,3],
                    shininess: 0
                },
                {
                    texture: '/assets/textures/diego-passadori-e6frrz-kh-0-unsplash.jpg',
                    size: [3,3,3],
                    shininess: 0
                },
                {
                    texture: '/assets/textures/04.jpg',
                    size: [3,3,3],
                    shininess: 0
                },
                {
                    texture: '/assets/textures/05.jpg',
                    size: [3,3,3],
                    shininess: 0
                },
                {
                    texture: '/assets/textures/06.jpg',
                    size: [4,4,4],
                    shininess: 0
                },
                {color: 'F44336'},
                {color: 'e91e63'},
                {color: '9c27b0'},
                {color: '673ab7'},
                {color: '3f51b5'},
                {color: '2196F3'},
                {color: '03a9f4'},
                {color: '00bcd4'},
                {color: '009688'},
                {color: '4CAF50'},
                {color: '8bc34a'},
                {color: 'cddc39'},
                {color: 'ffeb3b'},
                {color: 'ffc107'},
                {color: 'ff9800'},
                {color: 'ff5722'},
                {color: '795548'},
                {color: '607d8b'},
                {color: '9e9e9e'},
                {color: 'FFFFFF'},
                {color: '000000'},
            ],
            imgData: null,
        }
    },
    created(){
        window.addEventListener("resize", this.onWindowsResize);
    },
    mounted(){
        this.createInstance();
    },
    destroyed() {
        window.removeEventListener("resize", this.onWindowsResize);
        window.location.reload();
    },
    computed:{

        material_textures() {
            return this.materials.filter(function(material){
                return material.texture
            })
        },
        material_colors() {
            return this.materials.filter(function(material){
                return material.color
            })
        },
        computed_childs() {
            return this.model_children
        },
        DevicePixelRatio_G: function(){
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
    methods:{

        setCanvas: function(){            
            this.canvas_wrapper = document.querySelector('#canvas_wrapper');
            this.canvas = document.querySelector('#canvas');
            this.canvasDimension = this.canvas_wrapper.getBoundingClientRect();
        },
        
        setScene: function(){
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xe8f5e9)
        },

        setRender: function(){
            this.renderer = new THREE.WebGLRenderer( {
                 canvas: this.canvas,
                 powerPreference: "default",
                 antialias: true,
                 stencil: true,
                 depth: true, 
                 alpha: true,
                 preserveDrawingBuffer: true
            } );
			
            
			
            this.renderer.setPixelRatio( this.DevicePixelRatio_G );
			this.renderer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
			this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.toneMapping = THREE.ReinhardToneMapping;
            this.renderer.toneMappingExposure = 0.70;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
			this.canvas_wrapper.appendChild( this.renderer.domElement );
        },

        setCamera: function(){
            this.camera = new THREE.PerspectiveCamera( 70, this.canvas_wrapper.clientWidth / this.canvas_wrapper.clientHeight, 1, 100 );
        },

        setControls: function(){
            this.controls = new OrbitControls( this.camera, this.renderer.domElement );
			this.controls.enablePan = false;
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.1;

            this.controls.minPolarAngle = Math.PI/2;
            this.controls.maxPolarAngle = Math.PI/2;

            this.controls.maxAzimuthAngle = Math.PI * 0.3;  
            this.controls.minAzimuthAngle = - Math.PI * 0.3;

            this.controls.minDistance = 2; //2
            this.controls.maxDistance = 5; //5

            let self = this;
            document.addEventListener( 'keydown', self.onKeyDown, false );
        },

        setLights: function(){
            this.hemisphereLight = new THREE.HemisphereLight( 0x448aff, 0x795548, 1.75 )
            this.scene.add( this.hemisphereLight );
			this.dirLight = new THREE.DirectionalLight(0xf8f8f8, 4.50);
            this.dirLight.position.set(-50,50,50);
            this.dirLight.castShadow = true;
            this.dirLight.shadow.bias = -0.0001;
            this.dirLight.shadow.mapSize.width = 1024*4;
            this.dirLight.shadow.mapSize.height = 1024*4;
            this.scene.add( this.dirLight );
        },

        setPostProcessing: function(){
            this.composer = new EffectComposer(this.renderer, {frameBufferType: HalfFloatType});
            this.composer.addPass(new RenderPass(this.scene, this.camera));
            
            const bloomEffect = new BloomEffect();
            bloomEffect.blur = 0.2;
            bloomEffect.intensity = 0.2;
            bloomEffect.filter = true;
            
            const effectPass = new EffectPass(this.camera,bloomEffect);
            effectPass.renderToScreen = true;
            this.composer.addPass(effectPass);
        },

        setModel: function(){
            let self = this;
            const loader = new GLTFLoader();
            loader.load( this.modelpath, function ( obj ) {

                self.model = obj.scene

                self.model.updateMatrixWorld();
                const box = new THREE.Box3().setFromObject(self.model);
                const size = box.getSize().length();
                const center = box.getCenter();
                self.model.position.x += (self.model.position.x - center.x);
                self.model.position.y += (self.model.position.y - center.y);
                self.model.position.z += (self.model.position.z - center.z);
                self.camera.position.y += size / 10;
                self.camera.position.z += size;
                self.camera.updateProjectionMatrix();
                self.camera.lookAt(center);

                self.model.traverse(child => { if ( child.isMesh ) {
                    child.castShadow = true; 
                    child.receiveShadow = true;
                    if(child.material.map) child.material.map.anisotropy = 16; 
                }});

                self.model.traverse(child => {
                    switch(child.name) {
                        case 'Scene':
                            break;
                        case '':
                            break;
                        case null:
                            break;
                        case 'SketchUp':
                            break;
                        case 'skp_camera_Last_Saved_SketchUp_View':
                            break;
                        case 'skp_camera_Scene_1':
                            break;
                        case 'skp_camera_Scene_2':
                            break;
                        default:
                            self.model_children.push(
                                {
                                    childID: child.name , 
                                    mtl: new THREE.MeshStandardMaterial( { color: 0xF8F8F8} ),
                                    children: child.children,
                                },
                            );  
                    }
                })

                self.scene.add( self.model );
                
            }, undefined, function ( error ) {
                console.error( error );
            } );
        },

        setTextures: function (child) {
            this.texture = new THREE.TextureLoader().load('https://pucmm-open-week.s3.us-east-2.amazonaws.com/middle_0ab3851b40.png');

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
                if (o.name == type ) {
                    o.traverse((child) =>{
                        
                        if (child.isMesh) {
                            child.material = mtl;
                        }

                    })
                }
            });
        },


        animate: function(){            
            requestAnimationFrame(this.animate);
            this.composer.render();
            this.controls.update();
        },
        onWindowsResize: function(){
            this.camera.aspect = this.canvas_wrapper.clientWidth / this.canvas_wrapper.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
	        this.composer.setSize(this.canvas_wrapper.clientWidth, this.canvas_wrapper.clientHeight);
        },


        createInstance: async function(){            
            await this.setCanvas(),
            await this.setScene(),
            await this.setRender(),
            await this.setCamera(),
            await this.setControls(),
            await this.setLights(),
            await this.setPostProcessing(),
            await this.setModel(),
            this.animate()
        },

        
        onKeyDown: function ( event ) {
            const step = 0.5; // world units

            switch ( event.keyCode ) {
                case 37:
                    this.model.position.x -= step;
                    break;

                case 39:
                    this.model.position.x += step;
                    break;
            }
        },
        

        screenshot: function() {
            let self = this;
            self.imgData = self.renderer.domElement.toDataURL();
            let link = document.createElement('a');
            link.style.display = 'none';
            link.setAttribute('href', self.imgData);
            link.setAttribute('download', "luxend model " + Date.now());
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },            
        save: function () {
            let self = this;
            const exporter = new GLTFExporter();
            self.scene.remove( self.hemisphereLight);
            self.scene.remove( self.dirLight);
            self.scene.remove( self.spotLight);
            exporter.parse( self.scene, function ( glb ) {
                function makeblob(){
                    self.model_blob = new Blob([glb], { type: "application/octet-stream" });
                    self.model_blob.name = self.model.name
                    //let file = {'model': blob, 'name': blob.name}
                    //self.saveActualModelToDB(file)
                    //console.log('save function started...saving to firestore');
                }
                makeblob()
                function downloadtopc(){
                    let d = document.createElement('a');
                    d.href = window.URL.createObjectURL(self.model_blob);
                    d.download = `${self.model_blob.name}.glb`;
                    document.body.appendChild(d);
                    d.click();
                    document.body.removeChild(d);
                }
                downloadtopc()
            }, {binary: true, embedImages: true} );
            self.scene.add( self.hemisphereLight);
            self.scene.add( self.dirLight);
            self.scene.add( self.spotLight);
        },


    },
}
</script>
