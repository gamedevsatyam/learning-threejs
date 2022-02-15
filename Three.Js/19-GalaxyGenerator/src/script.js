import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Group } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const ambientLight = new THREE.AmbientLight('white', 1)
// scene.add(ambientLight)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const sunTexture = textureLoader.load('/textures/sun.png')
const mercuryTexture = textureLoader.load('/textures/mercury.png')
const venusTexture = textureLoader.load('/textures/venus.png')
const earthTexture = textureLoader.load('/textures/earth.png')
const marsTexture = textureLoader.load('/textures/mars.png')
const jupiterTexture = textureLoader.load('/textures/jupiter.png')
const saturnTexture = textureLoader.load('/textures/saturn.png')
const uranusTexture = textureLoader.load('/textures/uranus.png')
const neptuneTexture = textureLoader.load('/textures/neptune.png')


/**
 * Solor System
 */
const Planets = new Group()
scene.add(Planets)

// Sun
const sunRadius = 5
const sunGeometry = new THREE.SphereBufferGeometry(sunRadius,32,32)
const sunMaterial = new THREE.MeshBasicMaterial()
sunMaterial.color = new THREE.Color('white')
sunMaterial.map = sunTexture
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
Planets.add(sun)

//Earth
const earthSize = 0.1
const earthGeometry = new THREE.SphereBufferGeometry(earthSize, 32, 32)
const earthMaterial = new THREE.MeshBasicMaterial()
earthMaterial.color = new THREE.Color('white')
earthMaterial.map = earthTexture
const earth = new THREE.Mesh(earthGeometry, earthMaterial)
earth.position.x = sunRadius + 3
Planets.add(earth)

//Mercury
const mercurySize = (earthSize/100)*38
const mercuryGeometry = new THREE.SphereBufferGeometry(mercurySize,32,32)
const mercuryMaterial = new THREE.MeshBasicMaterial()
mercuryMaterial.color = new THREE.Color('white')
mercuryMaterial.map = mercuryTexture
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
mercury.position.x = sunRadius+1
Planets.add(mercury)


//Venus
const venusSize = (earthSize / 100) * 95
const venusGeometry = new THREE.SphereBufferGeometry(venusSize, 32, 32)
const venusMaterial = new THREE.MeshBasicMaterial()
venusMaterial.color = new THREE.Color('white')
venusMaterial.map = venusTexture
const venus = new THREE.Mesh(venusGeometry, venusMaterial)
venus.position.x = sunRadius + 2
venus.scale
Planets.add(venus)



//Mars
const marsSize = (earthSize / 100) * 53
const marsGeometry = new THREE.SphereBufferGeometry(marsSize, 32, 32)
const marsMaterial = new THREE.MeshBasicMaterial()
marsMaterial.color = new THREE.Color('white')
marsMaterial.map = marsTexture
const mars = new THREE.Mesh(marsGeometry, marsMaterial)
mars.position.x = sunRadius + 4
Planets.add(mars)

//jupiter
const jupiterSize = (earthSize / 100) * 1120
const jupiterGeometry = new THREE.SphereBufferGeometry(jupiterSize, 32, 32)
const jupiterMaterial = new THREE.MeshBasicMaterial()
jupiterMaterial.color = new THREE.Color('white')
jupiterMaterial.map = jupiterTexture
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
jupiter.position.x = sunRadius + 6.5
Planets.add(jupiter)

//saturn
const saturnSize = (earthSize / 100) * 945

const saturnGeometry = new THREE.SphereBufferGeometry(saturnSize, 32, 32)
const saturnMaterial = new THREE.MeshBasicMaterial()
saturnMaterial.color = new THREE.Color('white')
saturnMaterial.map = saturnTexture
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial)
saturn.position.x = sunRadius + 9.5
Planets.add(saturn)

//uranus
const uranusSize = (earthSize / 100) * 400

const uranusGeometry = new THREE.SphereBufferGeometry(uranusSize, 32, 32)
const uranusMaterial = new THREE.MeshBasicMaterial()
uranusMaterial.color = new THREE.Color('white')
uranusMaterial.map = uranusTexture
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial)
uranus.position.x = sunRadius + 11.5
Planets.add(uranus)

//Neptune
const neptuneSize = (earthSize / 100) * 388

const neptuneGeometry = new THREE.SphereBufferGeometry(neptuneSize, 32, 32)
const neptuneMaterial = new THREE.MeshBasicMaterial()
neptuneMaterial.color = new THREE.Color('white')
neptuneMaterial.map = neptuneTexture
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial)
neptune.position.x = sunRadius + 13
Planets.add(neptune)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//AxesHelper
const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
console.log(camera.position.x);
 //camera.position.y = 3
camera.position.z =10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()



		//ROtate Planets
		//Planets.rotation.y = elapsedTime *0.1
		//jupiter.rotation.y = elapsedTime *10
		// console.log(jupiter.position.x);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()