import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import './App.css'

function App() {

  //add scene
  const scene = new THREE.Scene()

  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load("/leaf-fall1-albedo.png")
  

  //create geometry
  const cubeGeometry = new THREE.SphereGeometry(0.5, 32, 32)
  const cubeMaterial = new THREE.MeshStandardMaterial({color : ''})
  cubeMaterial.aoMap = texture
  const meshCube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  


   //create camera
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5

   const canvas = document.getElementById('galaxy');

  //initialize renderer
  const renderer = new THREE.WebGLRenderer({canvas, antialias : true});
  renderer.setSize(window.innerWidth, window.innerHeight)
  
  renderer.render(scene, camera)

  //initialize the controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true

  //create light
  const light = new THREE.AmbientLight("white", 0.5);
 


   scene.add(meshCube, light)

   //create arrays of planets
   const planets = [{
    name : "mercury",
    radius : 2,
    speed : 0.003
   },
   {
    name : "venus",
    radius : 2,
    speed : 0.003,
    moons : [{
      radius : 2,
      speed : 4
    }]
   },
   {
    name : "earth",
    radius : 2,
    speed : 0.003,
    moons : [{
      radius : 2,
      speed : 4
    }]
   },
   {
    name : "mars",
    radius : 2,
    speed : 0.003,
    moons : [{
      radius : 2,
      speed : 4
    }]
   },
   {
    name : "jupiter",
    radius : 2,
    speed : 0.003,
    moons : [{
      radius : 2,
      speed : 4
    }]
   },
   {
    name : "sarturn",
    radius : 2,
    speed : 0.003,
    moons : [{
      radius : 2,
      speed : 4
    }]
   },
   {
    name : "uranus",
    radius : 2,
    speed : 0.003,
    moons : [{
      radius : 2,
      speed : 4
    }]
   },
   {
    name : "neptune",
    radius : 2,
    speed : 0.003,
    moons : [{
      radius : 2,
      speed : 4
    }]
   },
  ]


  const animate = () => {
    controls.update();

    meshCube.rotation.y += 0.05

    renderer.render(scene, camera)

    renderer.setSize(window.innerWidth, window.innerHeight)

    camera.aspect = window.innerWidth / window.innerHeight

    camera.updateProjectionMatrix()
    
    window.requestAnimationFrame(animate)
  }

  animate()
  

  return (
    <>
      
       
    </>
  )
}

export default App
