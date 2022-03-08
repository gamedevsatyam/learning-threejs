import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_bold.typeface.json',
	(font)=>
	{
		const textMaterial = new THREE.MeshNormalMaterial()

		//Text1
		const vsatyamGeometry = new TextGeometry(
			'vSatyam',
			{
				font: font,
				size:0.5,
				height: 0.2,
				curveSegments: 1,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.01,
				bevelOffset: 0,
				bevelSegments: 1
			}
		)
		vsatyamGeometry.center()

		const vSatyam = new THREE.Mesh(vsatyamGeometry, textMaterial)
		scene.add(vSatyam)

		// Text2
		const geekysvGeometry = new TextGeometry(
			'@geekysv',
			{
				font: font,
				size: 0.1,
				height: 0.02,
				curveSegments: 0.11,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.,
				bevelOffset: 0,
				bevelSegments: 1
			}
		)
		geekysvGeometry.computeBoundingBox()
		geekysvGeometry.translate(
			geekysvGeometry.boundingBox.max.x * 0.2,
			geekysvGeometry.boundingBox.max.y * 3,
			-geekysvGeometry.boundingBox.max.z * 0.5
		)

		const geekysv = new THREE.Mesh(geekysvGeometry, textMaterial)
		scene.add(geekysv)

		// Text3
		const tagGeometry = new TextGeometry(
			'"I am what I am"',
			{
				font: font,
				size: 0.2,
				height: 0.02,
				curveSegments: 0.2,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.,
				bevelOffset: 0,
				bevelSegments: 1
			}
		)
		tagGeometry.center()
		tagGeometry.computeBoundingBox()
		tagGeometry.translate(
			tagGeometry.boundingBox.max.x * 0,
			-tagGeometry.boundingBox.max.y * 5,
			-tagGeometry.boundingBox.max.z * 0.5
		)

		const tag = new THREE.Mesh(tagGeometry, textMaterial)
		scene.add(tag)
	}
)

const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)




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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()