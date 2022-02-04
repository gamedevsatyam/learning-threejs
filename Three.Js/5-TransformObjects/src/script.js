import './style.css'
import * as THREE from 'three'
import { Group } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Group
const cubeGroup = new THREE.Group()
scene.add(cubeGroup)

const object1 = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshBasicMaterial({color:'green'})
)
object1.position.x = -1
cubeGroup.add(object1)

const object2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'red' })
)
object2.position.x = 1
cubeGroup.add(object2)


//AxesHelper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// size
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0.5, 1, 3)
camera.rotation.x =Math.PI * -0.1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)