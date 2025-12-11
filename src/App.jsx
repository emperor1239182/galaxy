import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import WebGL from 'three/addons/capabilities/WebGL.js';
import { useEffect } from 'react';

import './App.css'

function App() {

  //add scene
  const scene = new THREE.Scene()

  //initiaize texture
  const textureLoader = new THREE.TextureLoader()
  const cubeTextureLoader = new THREE.CubeTextureLoader()
  cubeTextureLoader.setPath("/milky/")
  //add texture for all planets
  const mercuryTexture = textureLoader.load("/sand1-albedo.png")
  const venusTexture = textureLoader.load("/graniterockface1_Base_Color.png")
  const earthTexture = textureLoader.load("/leaf-fall1-albedo.png")
  const marsTexture = textureLoader.load("/sandstonecliff-albedo.png")
  const jupiterTexture = textureLoader.load("/limestone3_Base_Color.png")

  const backgroundCubemap = cubeTextureLoader.load([
   'px.png',

   'nx.png',

   'py.png',

   'ny.png',

   'pz.png',

   'nz.png'
  ]);
  
  scene.background = backgroundCubemap
  const moonTexture = textureLoader.load("/planet_surface-albedo.png")
  //create geometry
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
  const sunMaterial = new THREE.MeshBasicMaterial({color : 'yellow'})
  const mesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  mesh.scale.setScalar(1.8)

  //create material for each planet
  const mercuryMaterial = new THREE.MeshStandardMaterial({map : mercuryTexture});
  const venusMaterial = new THREE.MeshStandardMaterial({map : venusTexture});
  const earthMaterial = new THREE.MeshStandardMaterial({map : earthTexture});
  const marsMaterial = new THREE.MeshStandardMaterial({map : marsTexture});
  const jupiterMaterial = new THREE.MeshStandardMaterial({map : jupiterTexture});

  const moonMaterial = new THREE.MeshStandardMaterial({map : moonTexture})

  


   //create camera
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 9

   const canvas = document.getElementById('galaxy');

  //initialize renderer
  const renderer = new THREE.WebGLRenderer({canvas, antialias : true});
  renderer.setSize(window.innerWidth, window.innerHeight)
  
  renderer.render(scene, camera)

  //initialize the controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true

  //add light
  const light = new THREE.AmbientLight("white", 0.15);
  const pointLight = new THREE.PointLight("white", 2)
 


   scene.add(mesh, pointLight, light)

   //create arrays of planets
   const planets = [{
    name : "mercury",
    radius : 0.35,
    speed : 0.01,
    distance : 2,
    material : mercuryMaterial
   },
   {
    name : "venus",
    radius : 0.5,
    speed : 0.009,
    distance : 4,
    material : venusMaterial
   },
   {
    name : "earth",
    radius : 1,
    speed : 0.005,
    distance : 6,
    material : earthMaterial,

    moons : [{
      name : "luna",
      radius : 0.3,
      speed : 0.015,
      distance : 1.2
    }]
   },
   {
    name : "mars",
    radius : 1.2,
    speed : 0.003,
    distance : 8,
    material : marsMaterial,

    moons : [{
      name : "luchia",
      radius : 0.1,
      speed : 0.02,
      distance : 1.1
    },
    {
      name : "fula",
      radius : 0.2 ,
      speed : 0.015,
      distance : 1.5
    }
  ]
   },
   {
    name : "jupiter",
    radius : 1.3,
    speed : 0.001,
    distance : 12,
    material : jupiterMaterial,

    
    moons : [{
      name : "jupMoon",
      radius : 0.1,
      speed : 0.017,
      distance : 2
    },
    {
      name : "jupMoon2",
      radius : 0.2,
      speed : 0.013,
      distance : 2.3
    }
  ]
   },
   /*
   {
    name : "sarturn",
    radius : 0.55,
    speed : 0.0036,
    distance : 14,
    material : sarturnMaterial,

    moons : [{
      name : "moon",
      radius : 0.3,
      speed : 0.005,
      distance : 1
    }]
   },
   {
    name : "uranus",
    radius : 0.43,
    speed : 0.002,
    distance : 16,
    material : uranusMaterial,

    moons : [{
      name : "moon",
      radius : 0.2,
      speed : 0.005,
      distance : 1
    }]
   },
   {
    name : "neptune",
    radius : 0.6,
    speed : 0.005,
    distance : 18,
    material : neptuneMaterial,

    moons : [{
      name : "moon",
      radius : 0.2,
      speed : 0.005,
      distance : 1
    }]
   },
   */
  ]

  // loop through each planet and initialize meshmaterial and add to scene
  const planetMeshes = planets.map((planet) => {
    //initialize material
    const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);

    //set scale
    planetMesh.scale.setScalar(planet.radius)
    planetMesh.position.x = planet.distance
    scene.add(planetMesh)

    //access the moons 
    planet.moons?.forEach(moon => {
      const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
      moonMesh.scale.setScalar(moon.radius)
      moonMesh.position.x = moon.distance
      planetMesh.add(moonMesh)
    });

    return planetMesh
  }); 

  console.log(planetMeshes)

  //handle aspect ratios resonsivity only when users resize screen
  window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  useEffect(()=>{
    const animate = () => {
    controls.update();

    //mesh.rotation.y += 0.005
    planetMeshes.forEach((planet, index) => {
      
    planet.rotation.y += planets[index].speed
    planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance
    planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance

    planet.children.forEach((moon, moonIndex)=>{
      console.log("hello")
     moon.rotation.y += planets[index].moons[moonIndex].speed
     moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance
     moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance
    })
    });  

    renderer.render(scene, camera)
    
    window.requestAnimationFrame(animate)
  }

  if(WebGL.isWebGL2Available()){
    animate()
  } else{
    console.log("no webGl available")
  }
  },[])
  


  

  return (
    <>
       
    </>
  )
}

export default App
