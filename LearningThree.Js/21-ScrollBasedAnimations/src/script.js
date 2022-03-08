import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { RedFormat } from 'three'
import { mapLinear } from 'three/src/math/mathutils'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
		.onChange(()=>{
			material.color.set(parameters.materialColor)
		})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Light
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1,1,0)
scene.add(directionalLight)

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader()
const materialTexture  = textureLoader.load('/textures/gradients/3.jpg')
materialTexture.magFilter = THREE.NearestFilter


/**
 * Mesh
 * 
 */
const material = new THREE.MeshToonMaterial({
	color: parameters.materialColor,
	gradientMap: materialTexture
}) 

const objectDistance = 4

const mesh1 = new THREE.Mesh(
	new THREE.TorusBufferGeometry(1,0.4,60,60),
	material
)

const mesh2 = new THREE.Mesh(
	new THREE.ConeBufferGeometry(1,2,32),
	material
)
const mesh3 = new THREE.Mesh(
	new THREE.TorusKnotBufferGeometry(0.8,0.35,100,16),
	material
)

mesh1.position.y = 0
mesh2.position.y = - objectDistance * 1
mesh3.position.y = - objectDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const meshs = [mesh1, mesh2, mesh3]

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
		alpha:true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.screenY

window.addEventListener('scroll', ()=> {
	scrollY = -window.scrollY
})


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
	const elapsedTime = clock.getElapsedTime()

	// animate Camera
	camera.position.y = scrollY / sizes.height * objectDistance

	// animate meshes
	for(const mesh of meshs) {
		mesh.rotation.x = elapsedTime * 0.2
		mesh.rotation.y = elapsedTime * 0.2
	}

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()