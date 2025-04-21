import './style.css'

// Disable 'Sort' and 'Layout' in order to fit the search filters with box grids
document.querySelector("#sort-by").style.display = "none";
document.querySelector("#layout").style.display = "none";

// Close button for project panel 
document.querySelector('.close').addEventListener('click', function(e) {
  const panel = document.querySelector('.projectview');
  if (panel.style.visibility == "visible") {
    if (panel.contains(e.target)) {
      hidePanel();
  }};
});

const boxes = document.querySelectorAll(".box");

const sound = document.getElementById("tickHover");
boxes.forEach(box => {
  box.addEventListener("mouseenter", () => {
    sound.play();
  });
});

const search = document.getElementById('searchfield');
search.oninput = () => {
  boxes.forEach(box => {
    toggleBoxDisplaySearch(box, search.value.toString(), 1);
  })
};

const os = document.querySelectorAll('#os')[1];
os.onchange = () => {
  boxes.forEach(box => {
    toggleBoxDisplaySearch(box, os.options[os.selectedIndex].value, 4);
  })
};

const languages = document.querySelectorAll('#languages')[1];
languages.onchange = () => {
  boxes.forEach(box => {
    toggleBoxDisplayMatch(box, languages.options[languages.selectedIndex].value, 5)
  })
};

const platform = document.querySelectorAll('#platform')[1];
platform.onchange = () => {
  boxes.forEach(box => {
    toggleBoxDisplayMatch(box, platform.options[platform.selectedIndex].value, 6);
  })
};

const field = document.querySelectorAll('#field')[1];
field.onchange = () => {
  boxes.forEach(box => {
    toggleBoxDisplaySearch(box, field.options[field.selectedIndex].value, 7);
  })
};

function toggleBoxDisplaySearch(box, value, children) {
  const textcontent = box.children[children].textContent;
  if(textcontent.search(value.toString()) == -1) {
    document.getElementById(box.id).style.display = "none";
  } else {
    document.getElementById(box.id).style.display = "block";
  }
}

function toggleBoxDisplayMatch(box, value, children) {
  const textcontent = box.children[children].textContent;
  if(textcontent.match(value.toString()) == null) {
    document.getElementById(box.id).style.display = "none";
  } else {
    document.getElementById(box.id).style.display = "block";
  }
}

const sortBy = document.querySelectorAll('#sort-by')[1];
sortBy.onchange = () => {
  const selectedLayout = sortBy.options[sortBy.selectedIndex].value;

  const boxContainer = document.querySelector('.box-selection');
  const projects = Array.from(boxContainer.querySelectorAll('.box'));

  if(selectedLayout.match("latest")) {
    projects.sort((a, b) => {
      const dateA = new Date(a.querySelector('.date').textContent.trim());
      const dateB = new Date(b.querySelector('.date').textContent.trim());
      return dateB - dateA;
    });
  }

  if(selectedLayout.match("oldest")) {
    projects.sort((a, b) => {
      const dateA = new Date(a.querySelector('.date').textContent.trim());
      const dateB = new Date(b.querySelector('.date').textContent.trim());
      return dateA - dateB;
    });
  }

  if(selectedLayout.match("asc")) {
    projects.sort((a, b) => {
      const nameA = a.querySelector('.title').textContent.trim().toLowerCase();
      const nameB = b.querySelector('.title').textContent.trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  if(selectedLayout.match("desc")) {
    projects.sort((a, b) => {
      const nameA = a.querySelector('.title').textContent.trim().toLowerCase();
      const nameB = b.querySelector('.title').textContent.trim().toLowerCase();
      return nameB.localeCompare(nameA);
    });
  }

  boxContainer.innerHTML = '';
  projects.forEach(item => boxContainer.appendChild(item));
};

const layout = document.querySelectorAll('#layout')[1];
layout.onchange = () => {
  const selectedLayout = layout.options[layout.selectedIndex].value;
  boxes.forEach(box => {
    switch(selectedLayout.toString()) {
      case "grid":
        box.classList.add('grid-layout');
        box.classList.remove('horizontal-layout');
        break;
      case "horizontal":
        box.classList.add('horizontal-layout');
        box.classList.remove('grid-layout');
        break;
    }
  })
};

const buttons = document.querySelectorAll('.nav-btn');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

const homeBtn = document.getElementById('homeBtn');
homeBtn.addEventListener("click", function() {
  document.querySelector(".portfolio").style.display = "block";
  document.querySelector(".portfolio").style.marginTop = "0%";
  document.querySelector(".portfolio").style.animationDelay = "0s";

  const layoutSelect = document.querySelector('.layout-option');
  if(layoutSelect.value == "horizontal") {
    boxes.forEach(box => {
      box.classList.add('grid-layout');
      box.classList.remove('horizontal-layout');
    });
    layoutSelect.value = "select";
  }

  document.querySelector("#sort-by").style.display = "none";
  document.querySelector("#layout").style.display = "none";

  document.querySelector(".about").style.display = "block";
  document.querySelector(".about").style.marginTop = "21%";

  if(window.innerHeight == "862" && window.innerWidth == "398") {
    document.querySelector(".about").style.marginTop = "90%";
  }
  else {
    document.querySelector(".about").style.marginTop = "26%";
  }

  document.querySelector(".about").style.animationDelay = "0s";

  document.querySelector(".contact").style.display = "block";
  document.querySelector(".contact").style.animationDelay = "0s";

  reset();
});

const portfolioBtn = document.getElementById('portfolioBtn');
portfolioBtn.addEventListener("click", function() {
  document.querySelector(".portfolio").style.display = "block";
  document.querySelector(".portfolio").style.marginTop = "0%";
  document.querySelector(".portfolio").style.animationDelay = "0s";

  const layoutSelect = document.querySelector('.layout-option');
  if(layoutSelect.value == "horizontal") {
    boxes.forEach(box => {
      box.classList.add('grid-layout');
      box.classList.remove('horizontal-layout');
    });
    layoutSelect.value = "select";
  }

  document.querySelector("#sort-by").style.display = "block";
  document.querySelector("#layout").style.display = "block";

  document.querySelector(".about").style.display = "none";

  document.querySelector(".contact").style.display = "none";

  reset();
});

const aboutBtn = document.getElementById('aboutBtn');
aboutBtn.addEventListener("click", function() {
  document.querySelector(".portfolio").style.display = "none";

  document.querySelector(".about").style.display = "block";
  document.querySelector(".about").style.position = "relative";
  document.querySelector(".about").style.marginTop = "0%";
  document.querySelector(".about").style.animationDelay = "0s";

  document.querySelector(".contact").style.display = "none";

  reset();
})

const contactBtn = document.getElementById('contactBtn');
contactBtn.addEventListener("click", function() {
  document.querySelector(".portfolio").style.display = "none";

  document.querySelector(".about").style.display = "none";

  document.querySelector(".contact").style.display = "block";
  document.querySelector(".contact").style.position = "relative";
  document.querySelector(".contact").style.marginTop = "0%";
  document.querySelector(".contact").style.animationDelay = "0s";

  reset();
});

// Reset Search Filters and displays all boxes
function reset() {
  search.value = "";
  os.value = "select";
  languages.value = "select";
  platform.value = "select";
  field.value = "select";
  layout.value = "select";
  sortBy.value = "select";

  boxes.forEach(box => {
    box.classList.remove('grid-layout', 'horizontal-layout');
    document.getElementById(box.id).style.display = "block";
  });
}

// Dark Mode Toggle
let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

let isDarkmodeEnabled;

const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
  isDarkmodeEnabled = true;
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
  isDarkmodeEnabled = false;
}

if(darkmode == "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})


boxes.forEach(box => {
  box.addEventListener("click", function(){ 
    switch(box.id) {
      case "first-project":
        document.getElementById("link").href = "https://github.com/eliaz5536/NetAuto"
        document.getElementById("banner").src = "textures/banner/banner1.png";
        document.getElementById("banner").style.transform = "translateY(75%)";
        document.getElementById("description").innerHTML = "NetAuto is a customizable network reconnaissance tool that automates enumeration of services, protocols and ports, suitable network scanning and penetration testing practices.";
        document.getElementById("description").style.top = "45%";
        break;

      case "second-project":
        document.getElementById("link").href = "https://github.com/eliaz5536/DirAuto"
        document.getElementById("banner").src = "textures/banner/banner2.png";
        document.getElementById("banner").style.transform = "translateY(75%)";
        document.getElementById("description").innerHTML = "DirAuto is a customizable directory reconnaissance tool that automates enumeration of subdomains, ideal for penetration testing environments and network scanning.";
        document.getElementById("description").style.top = "45%";
        break;

      case "third-project":
        document.getElementById("link").href = "https://github.com/eliaz5536/ShellSketch"
        document.getElementById("banner").src = "textures/banner/banner3.png";
        document.getElementById("banner").style.transform = "translateY(20%)";
        document.getElementById("description").innerHTML = "Bash script template for automatically generating structred-formatted shell scripts.";
        if(window.innerHeight == "862" && window.innerWidth == "398") {
          document.getElementById("description").style.top = "45%";
        }
        else {
          document.getElementById("description").style.top = "21%";
        }
        break;

      case "fourth-project":
        document.getElementById("link").href = "https://github.com/eliaz5536/LFSInstaller"
        document.getElementById("banner").src = "textures/banner/banner4.gif";
        document.getElementById("banner").style.transform = "translateY(75%)";
        document.getElementById("description").innerHTML = "Linux From Scratch script installer generator that creates installation scripts by preference.";
        document.getElementById("description").style.top = "45%";
        break;
    }

    const panel = document.querySelector('.projectview');
    panel.style.visibility = 'visible';
    panel.style.opacity = '1';
  });
})

function hidePanel() {
  const panel = document.querySelector('.projectview');
  panel.style.opacity = '0';
  
  setTimeout(() => {
    panel.style.visibility = 'hidden';
  }, 500); 
}

/* Three.JS code */
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import GUI from 'lil-gui';

import Stats from 'three/examples/jsm/libs/stats.module'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

let currentScene, currentCamera;
let camera, camera2, stats;
let renderer, bloomPass;

let scene2;

const params = {
  ambientColor: '#ffffff',
  ambientIntensity: 1,
  directionalColor: '#ffffff',
  directionalIntensity: 1,
  sphereAmbientIntensity: 1,
  cubeBoxLightIntensity: 1,
  cubeEmissiveIntensity: 1,
  threshold: 0,
  strength: 1,
  radius: 0,
  focus: 1.0,
  aperture: 0.025,
  maxblur: 0.01
};

const container = document.querySelector('#bg');

const scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

currentScene = scene;
currentCamera = camera;

camera.position.x = 0;
camera.position.y = 520;
camera.position.z = 3;

camera.rotation.x = 5;
camera.rotation.y = 0;
camera.rotation.z = 0;

renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true
});

scene.background = new THREE.Color( 0x000000 );

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
ambientLight.intensity = 0.05;
scene.add(ambientLight);

let darkBluedirectionalLight = new THREE.DirectionalLight(0x010824)
darkBluedirectionalLight.position.set(0,522,3);
darkBluedirectionalLight.intensity = 5;
scene.add(darkBluedirectionalLight);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

const textureLoader = new THREE.TextureLoader();
const cloudTexture = textureLoader.load("textures/cloud.png");
const cloudMaterial = new THREE.MeshLambertMaterial({
    map:cloudTexture,
    transparent: true,
    opacity: 1
});
const cloudGeo = new THREE.PlaneGeometry(200,200);
for(let p=0; p<100; p++) {
  const cloudMesh = new THREE.Mesh(cloudGeo, cloudMaterial);
  cloudMesh.position.set(Math.random()*800-400, 50, Math.random()*800-400);
  cloudMesh.rotation.x += 250;
  cloudMesh.material.opacity = 0.75;
  scene.add(cloudMesh);
}

const metalTextureLoader = new THREE.TextureLoader();
const metalTexture = metalTextureLoader.load("textures/metal.avif");
for(let i = 0; i < 500; i++) {
  const geometry = new THREE.BoxGeometry( 15, 100, 15 )
  const material = new THREE.MeshStandardMaterial({
    map: metalTexture,
    color: 0xFFFFFF 
  });
  const rectangle = new THREE.Mesh( geometry, material );
  rectangle.position.set(
    THREE.MathUtils.randFloatSpread(4000), 
    0, 
    THREE.MathUtils.randFloatSpread(4000), 
  );
  scene.add(rectangle)
}


// Scene 2

scene2 = new THREE.Scene();
camera2 = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );

const ambientLight2 = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene2.add(ambientLight2);

// Invisible Mesh (for sphere rotation)
const invisGeometry = new THREE.BoxGeometry(2, 2, 2)
const invisMaterial = new THREE.MeshStandardMaterial( { 
  color: 0xFFFFFF,
  transparent: true
});
const invisMesh = new THREE.Mesh( invisGeometry, invisMaterial );
invisMesh.position.set(0, 70, 0);
scene2.add(invisMesh);

// Rotating Cube
const cubeGeometry = new THREE.BoxGeometry(15, 15, 15)
const cubeMaterial = new THREE.MeshStandardMaterial( { 
  roughness: 0,
  metalness: 0.5,
  color: 0xFFFFFF,
  emissive: 0x002fbd,
  emissiveIntensity: 1
});
const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
cubeMesh.position.set(0, 70, 0);
scene2.add(cubeMesh)

// Rotating Spheres
const sphereGeometry = new THREE.SphereGeometry(5, 15, 15)
const sphereMaterial = new THREE.MeshStandardMaterial( { 
  roughness: 0,
  metalness: 0.5,
  color: 0xFFFFFF,
  emissive: 0x009fc7,
  emissiveIntensity: 0.5
});
const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
const sphereObj = new THREE.Object3D();
sphereObj.add(sphereMesh);
invisMesh.add(sphereObj);
sphereMesh.position.x = 30;

const sphere2Mesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
const sphere2Obj = new THREE.Object3D();
sphere2Obj.add(sphere2Mesh);
invisMesh.add(sphere2Obj);
sphere2Mesh.position.x = -30;

const sphere3Mesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
const sphere3Obj = new THREE.Object3D();
sphere3Obj.add(sphere3Mesh);
invisMesh.add(sphere3Obj);
sphere3Mesh.position.x = 30;

const sphere4Mesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
const sphere4Obj = new THREE.Object3D();
sphere4Obj.add(sphere4Mesh);
invisMesh.add(sphere4Obj);
sphere4Mesh.position.x = -30;

// Directional Light
const directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.1 );
directionalLight.position.set(0, 250, 0);
directionalLight.rotation.set(0, -50, 0);
scene2.add( directionalLight );

// Point Light (Box)
const boxLight = new THREE.PointLight( 0x009fc7, 5, 0 );
boxLight.position.set(0, 70, 0);
cubeMesh.add(boxLight);
scene.add( boxLight );
boxLight.lookAt(scene2.position);

// Pillar
const pillarTextureLoader = new THREE.TextureLoader();
const pillarTexture = pillarTextureLoader.load("textures/metal.avif");
const pillarGeometry = new THREE.BoxGeometry( 15, 100, 15 )
const pillarMaterial = new THREE.MeshStandardMaterial( { 
  color: 0xFFFFFF,
  map: pillarTexture,
  roughness: 1,
  metalness: 1
} );
const pillarMesh = new THREE.Mesh( pillarGeometry, pillarMaterial );
pillarMesh.position.set(0, 5, 0);
scene2.add(pillarMesh);

const tween1 = new TWEEN.Tween(camera.position)
  .to({ x: 0, y: 500, z: 3 }, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    camera.position.x = object.x;
    camera.position.y = object.y;
    camera.position.z = object.z;
  });

const tween1_rotation = new TWEEN.Tween(camera.rotation)
  .to({ x: 4.97, y: 0, z: -0.04 }, 2000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((object) => {
    camera.rotation.x = object.x;
    camera.rotation.y = object.y;
    camera.rotation.z = object.z;
  });

const tween2 = new TWEEN.Tween(camera.position)
  .to({ x: 0, y: 3, z: 50 }, 1000)
  .easing(TWEEN.Easing.Quintic.In)
  .onUpdate((object) => {
    camera.position.x = object.x;
    camera.position.y = object.y;
    camera.position.z = object.z;
  })
  .onStart(() => {
    tween3.start();
    tween4.start();
  })

const tween3 = new TWEEN.Tween(ambientLight)
  .to({ intensity: 0 }, 1000)
  .easing(TWEEN.Easing.Cubic.In);

const tween4 = new TWEEN.Tween(darkBluedirectionalLight)
  .to({ intensity: 0 }, 1000)
  .easing(TWEEN.Easing.Cubic.In);

const group1 = new TWEEN.Group();
tween1.chain(tween2);

group1.add(tween1);
group1.add(tween1_rotation);
group1.add(tween2);
group1.add(tween3);
group1.add(tween4);

tween1.start();
tween1_rotation.start();

camera2.position.x = 100;
camera2.position.y = 70;
camera2.position.z = 100;

camera2.rotation.x = 0;
camera2.rotation.y = 1;
camera2.rotation.z = 0;

camera2.opacity = 0.0;

const renderPass = new RenderPass( scene2, camera2 ); 

//

bloomPass = new UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

//

const outputPass = new OutputPass();

// 

const fxaaPass = new ShaderPass( FXAAShader );
const pixelRatio = renderer.getPixelRatio();
fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio );
fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio );

//

const bokehPass = new BokehPass( scene2, camera2, {
  focus: params.focus,
  aperture: params.aperture,
  maxblur: params.maxblur
});  

//

const composer = new EffectComposer( renderer );
composer.addPass( renderPass );
composer.addPass( bloomPass );
composer.addPass( fxaaPass );
composer.addPass( bokehPass );
composer.addPass( outputPass );

// 

stats = new Stats();

// 

ambientLight2.intensity = 0.0;
directionalLight.intensity = 0.0;
sphereMaterial.emissiveIntensity = 0.0;
cubeMaterial.emissiveIntensity = 0.0;
bokehPass.strength = 0.0;
bokehPass.radius = 0.0;

let currentColor = new THREE.Color(0x000000);
let lightness = 0;

function animate() {
  TWEEN.update();

  group1.update();
  renderer.render( currentScene, currentCamera );

  if(group1.allStopped()) {
    composer.render();
    if (isDarkmodeEnabled) {
      currentColor = new THREE.Color(0x000000);
      bloomPass.threshold = 0;
    } else {
      currentColor.setHSL(0, 0, lightness);
      sphereMaterial.color.set( 0xf3f3f3 );
      cubeMaterial.color.set( 0xbbbbbb );
      bloomPass.threshold = 1;
    }

    if(window.innerHeight == "862" && window.innerWidth == "398") {
      camera2.rotation.y = 0.9;
    }

    scene2.background = currentColor;

    if ( lightness < 100 ) { lightness += 0.01; }
    if ( ambientLight2.intensity < 1.0 ) { ambientLight2.intensity += 0.01; }
    if ( directionalLight.intensity < 1.0 ) { directionalLight.intensity += 0.01; }
    if ( sphereMaterial.emissiveIntensity < 1.0 ) { sphereMaterial.emissiveIntensity += 0.01; }
    if ( cubeMaterial.emissiveIntensity < 1.0 ) { cubeMaterial.emissiveIntensity += 0.01; }
    if ( bokehPass.strength < 1.815 ) { bokehPass.strength += 0.01; }
    if ( bokehPass.radius < 0.45 ) { bokehPass.radius += 0.01; }
    
    cubeMesh.rotateX(0.04);
    cubeMesh.rotateY(0.04);
    cubeMesh.rotateZ(0.04);

    sphereObj.rotateY(0.03);

    sphere2Obj.rotateY(0.03);

    sphere3Obj.rotateY(0.03);
    sphere3Obj.rotateZ(0.03);

    sphere4Obj.rotateY(0.03);
    sphere4Obj.rotateZ(0.03);

    currentScene = scene2;
    currentCamera = camera2;
  }

  requestAnimationFrame( animate );
  stats.update();
}

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

function changeColor() {

}


animate();

const gui = new GUI();
gui.hide();

const colorFormats = {
  string: "#ffffff",
  int: 0xffffff,
  object: { r: 1, g: 1, b: 1},
  array: [1, 1, 1],
};

const ambientLightFolder = gui.addFolder( 'Ambient Light' );
ambientLightFolder.addColor( colorFormats, "string" ).name("Color").onChange( function ( value ) {
  ambientLight2.color.set(colorFormats.string);
});
ambientLightFolder.add( params, 'ambientIntensity', 0.0, 3.0 ).name("Intensity").onChange( function ( value ) {
  ambientLight2.intensity = Number( value );
});

const directionalLightFolder = gui.addFolder( 'Directional Light' );
directionalLightFolder.addColor( colorFormats, "string" ).name("Color").onChange( function ( value ) {
  directionalLight.color.set(colorFormats.string);
});
directionalLightFolder.add( params, 'directionalIntensity', 0.0, 3.0 ).name("Intensity").onChange( function ( value ) {
  directionalLight.intensity = Number( value );
});

const orbitingSpheresFolder = gui.addFolder( 'Spheres' );
orbitingSpheresFolder.addColor( colorFormats, "string" ).name("Color").onChange( function ( value ) {
  sphereMaterial.color.set(colorFormats.string);
});
orbitingSpheresFolder.addColor( colorFormats, "string" ).name("Emissive Color").onChange( function ( value ) {
  sphereMaterial.emissive.set(colorFormats.string);
});
orbitingSpheresFolder.add( params, 'sphereAmbientIntensity', 0.0, 3.0 ).name("Emissive Intensity").onChange( function ( value ) {
  sphereMaterial.emissiveIntensity = Number( value );
});

const rotatingCubeFolder = gui.addFolder( 'Cube' );
rotatingCubeFolder.addColor( colorFormats, "string" ).name("Color").onChange( function ( value ) {
  cubeMaterial.color.set(colorFormats.string);
});
rotatingCubeFolder.addColor( colorFormats, "string" ).name("Emissive").onChange( function ( value ) {
  cubeMaterial.emisive.set(colorFormats.string);
});
rotatingCubeFolder.add( params, "cubeEmissiveIntensity", 0.0, 3.0 ).name("Emissive Intensity").onChange( function ( value ) {
  cubeMaterial.emissiveIntensity = Number( value );
});
rotatingCubeFolder.addColor( colorFormats, "string" ).name("Box Light Color").onChange( function ( value ) {
  boxLight.color.set(colorFormats.string);
});
rotatingCubeFolder.add( params, "cubeBoxLightIntensity", 0.0, 3.0 ).name("Box Light Intensity").onChange( function ( value ) {
  boxLight.intensity = Number( value );
});

const bloomFolder = gui.addFolder( 'Bloom' );
bloomFolder.add( params, 'threshold', 0.0, 1.0 ).onChange( function ( value ) {
  bloomPass.threshold = Number( value );
});
bloomFolder.add( params, 'strength', 0.0, 3.0 ).onChange( function ( value ) {
  bloomPass.strength = Number( value );
});
bloomFolder.add( params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
  bloomPass.radius = Number( value );
});

const blurFolder = gui.addFolder( 'Blur' );
blurFolder.add( params, 'focus', 0.0, 5.0 ).name("Focus").onChange( function ( value ) {
  bokehPass.focus = Number( value );
});
blurFolder.add( params, 'aperture', 0.0, 0.1 ).name("Aperture").onChange( function ( value ) {
  bokehPass.aperture = Number( value );
});
blurFolder.add( params, 'maxblur', 0.0, 1.0 ).name("Maxblur").onChange( function ( value ) {
  bokehPass.maxblur = Number( value );
});