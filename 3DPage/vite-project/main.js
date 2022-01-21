import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
})
 renderer.setPixelRatio( window.devicePixelRatio );
 renderer.setSize( window.innerWidth, window.innerHeight );
 camera.position.setZ(30);
 camera.position.setX(-3);

 renderer.render( scene, camera );

 const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
 const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
 const torus = new THREE.Mesh( geometry, material );

 scene.add(torus);

//  LUZ FOCADA
 const pointLight = new THREE.PointLight(0xffffff);
 // LOCAL E DIREÇÃO DA LUZ
 pointLight.position.set(25, 25, 25);

//  LUZ AMBIENTE
 const ambientLight = new THREE.AmbientLight(0xffffff);

 
 scene.add(pointLight, ambientLight);

//  //HELPERS
//  const lightHelper = new THREE.PointLightHelper(pointLight);
//  const gridHelper = new THREE.GridHelper(200, 50);
//  scene.add(lightHelper, gridHelper);

//  // CONTROLA A MOVIMENTAÇÃO DA CAMERA
//  const controls = new OrbitControls(camera, renderer.domElement);

 function animate() {
   requestAnimationFrame( animate );

   torus.rotation.x += 0.01;
   torus.rotation.z += 0.005;
   torus.rotation.y += 0.01;
   

   renderer.render( scene, camera );

  }

  animate();

  function addStars(){

    const geometry = new THREE.SphereGeometry(0.25, 20, 20);
    const material = new THREE.MeshStandardMaterial( { color:0xffffff } );
    const star = new THREE.Mesh( geometry, material );

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);

  }

  Array(300).fill().forEach(addStars);

  // ATRIBUI TEXTURA DE ESPAÇO PRO CENÁRIO 
  //BACKGROUND
  const spaceTexture = new THREE.TextureLoader().load('space.jpg');
  scene.background = spaceTexture;

  //CRIA O CUBO COM A IMAGEM ESCOLHIDA
  const myTexture = new THREE.TextureLoader().load("cube-pic.jpg");

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( {map: myTexture} )
  );
  
  scene.add(cube);

  cube.position.z = -5;
  cube.position.x = 2;

  //LUA
  const moonTexture = new THREE.TextureLoader().load("moon.jpg");
  const normalTexture = new THREE.TextureLoader().load("normal.jpg");
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );
  scene.add(moon);

  moon.position.z = 30;
  moon.position.setX(-10);

  function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    console.log(t);
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  }

  window.addEventListener("scroll", () => moveCamera());
