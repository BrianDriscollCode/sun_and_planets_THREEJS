import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from "lil-gui";
import gsap from "gsap";
import { Material } from 'three';


//Debug
//const gui = new dat.GUI();

//Buttons
const seeEarthButton = document.getElementById("seeEarth");
const seeMarsButton = document.getElementById("seeMars");
const seeJupiterButton = document.getElementById("seeJupiter");

let earthActive = true;
let marsActive = false;
let jupiterActive = false;

seeEarthButton.addEventListener("click", () => {

    // camera.position.x = 1.15884;
    // camera.position.z = 0.54045;
    gsap.to(camera.position, {
        x: 1.15884, z: 0.54045, duration: 0.7, ease: "power3.inOut"
    })


    if (earthActive === false) {
        //soundEffect.play()
        whooshSound.play();
        earthActive = true;
        marsActive = false;
        jupiterActive = false;
    }

})

seeMarsButton.addEventListener("click", () => {

    // camera.position.x = 0.95;
    // camera.position.z = 14.4586;
    gsap.to(camera.position, {
        x: 0.95, z: 14.4586, duration: 0.7, ease: "power3.inOut"
    })


    if (marsActive === false) {
        //soundEffect.play()
        whooshSound.play();
        earthActive = false;
        marsActive = true;
        jupiterActive = false;
    }

})

seeJupiterButton.addEventListener("click", () => {

    // camera.position.x = 13.9986;
    // camera.position.z = 38.49615;
    gsap.to(camera.position, {
        x: 13.9986, z: 38.49615, duration: 0.7, ease: "power3.inOut"
    })
   

    if (jupiterActive === false) {
        //soundEffect.play()
        whooshSound.play();
        jupiterActive = true;
        earthActive = false;
        marsActive = false;
        
    }

})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Loading Manager
 */

 const loadingManager = new THREE.LoadingManager();

 loadingManager.onStart = () => {
     console.log('loading started')
 }
 
 loadingManager.onProgress = () => {
     console.log('loading...');
 }
 
 loadingManager.onLoad = () => {
     console.log('Loaded');
 }
 
 
 
 /**
  * Texture Loader 
  */
 
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("/textures/Earth_Texture.jpg");
const sunTexture = textureLoader.load("/textures/Sun_Texture.jpg");
const marsTexture = textureLoader.load("/textures/Mars_Texture.jpg");
const jupiterTexture = textureLoader.load("/textures/Jupiter_Texture.jpg")
const starsTexture = textureLoader.load("/textures/Milky_Way_Texture.jpg");
const moonTexture = textureLoader.load("/textures/Moon_Texture.jpg");

earthTexture.generateMipmaps = false;
earthTexture.magFilter = THREE.NearestFilter;

starsTexture.generateMipmaps = true;


//Material
const earthMaterial = new THREE.MeshLambertMaterial({ map: earthTexture});
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const jupiterMaterial = new THREE.MeshLambertMaterial({map: jupiterTexture});
const planeMaterial = new THREE.MeshBasicMaterial({map: starsTexture})
const marsMaterial = new THREE.MeshLambertMaterial({map: marsTexture})
const moonMaterial = new THREE.MeshLambertMaterial({ map: moonTexture})

/**
 * Object
 */

const earth = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    earthMaterial
)
scene.add(earth);
earth.name = "Earth";

const moon = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    moonMaterial
)
const moonObj = new THREE.Object3D();
moon.position.x -= 1
moon.scale.set(0.25, 0.25, 0.25)
moonObj.add(moon);
scene.add(moonObj)
moon.name = "Moon";

const mars = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    marsMaterial
)
scene.add(mars)
mars.scale.set(0.7, 0.7, 0.7)
mars.position.z += 14;
mars.name = "Mars"


const jupiter = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    jupiterMaterial
)
scene.add(jupiter)
jupiter.scale.set(15, 15, 15)
jupiter.position.z += 30;
jupiter.name = "Jupiter"


const sun = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 128, 128),
    sunMaterial
)
scene.add(sun)
sun.scale.set(65, 65, 65)
sun.position.z -= 65
sun.position.x -= 5;
sun.name = "Sun";

const stars = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100),
    planeMaterial
)
scene.add(stars)
stars.scale.set(30,14)
stars.position.z -= 200;
stars.position.x -= 900
stars.rotation.y = 1;
stars.name = "Stars"

// gui
//     .add(stars.scale, "x")
//     .name("scale stars x")

// gui 
//     .add(stars.scale, "y")
//     .name("scale stars y")

// gui 
//     .add(stars.position, "x")
//     .name("stars position x")

// gui
//     .add(stars.position, "y")
//     .name("stars position y")
    
/**
 * light
 */

const ambientLight = new THREE.AmbientLight( 0x404040, 0.5 )
scene.add(ambientLight)

const spotLight = new THREE.SpotLight("white", 1);
spotLight.position.set(2300, 0, -1800)

// gui
//     .add(spotLight.position, "x")
//     .name("spotlight x")

// gui
//     .add(spotLight.position, "y")
//     .name("spotlight y")
    
// gui
//     .add(spotLight.position, "z")
//     .name("spotlight z")

scene.add(spotLight)

spotLight.position.y += 5
spotLight.rotateX(-3)
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
    camera.position.x = 1.15884;
    camera.position.y = 0;
    camera.position.z = 0.54045;
    camera.rotation.x = 0;
    camera.rotation.y = 0.90909;
    camera.rotation.z = 0;

scene.add(camera)


/**
 * Sound
 */

 const listener = new THREE.AudioListener();
 camera.add( listener )
 const sound = new THREE.Audio(listener);
 
 
 const audioLoader = new THREE.AudioLoader();
 audioLoader.load( 'sound/space.mp3', function( buffer ) {
     sound.setBuffer( buffer );
     sound.setLoop( true );
     sound.setVolume( 0.2 );
     sound.play();
     sound.autoplay = true;
 });


 const clickSound = new THREE.Audio(listener);
 audioLoader.load( 'sound/click.wav', function( buffer ) {
    clickSound.setBuffer( buffer );
    clickSound.setLoop( false )
    clickSound.setVolume( 0.3 );
});

const whooshSound = new THREE.Audio(listener);
audioLoader.load( 'sound/whoosh_mixdown.mp3', function( buffer ) {
    whooshSound.setBuffer( buffer );
    whooshSound.setLoop( false )
    whooshSound.setVolume( 0.3 );
});

//control camera
// gui
//     .add(camera.position, "x")
//     .min(0.01)
//     .max(100)
//     .name("x position")

// gui
//     .add(camera.position, "y")
//     .min(0.01)
//     .max(100)
//     .name("y position")

// gui
//     .add(camera.position, "z")
//     .min(0.01)
//     .max(100)
//     .name("z position")

// gui
//     .add(camera.rotation, "x")
//     .min(-5)
//     .max(5)
//     .name("x rotation")

// gui
//     .add(camera.rotation, "y")
//     .min(-5)
//     .max(5)
//     .name("y rotation")

// gui
//     .add(camera.rotation, "z")
//     .min(-5)
//     .max(5)
//     .name("z rotation")


//Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * raycast
 */

 const raycaster = new THREE.Raycaster();
 raycaster.set((30,30,30),(30,30,30))
 const pointer = new THREE.Vector2();
 
 function onPointerMove( event ) {
 
     // calculate pointer position in normalized device coordinates
     // (-1 to +1) for both components
 
     pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
     pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
 
 }

 /**
  * info container
  */

const info_container = document.querySelector(".info_container");
info_container.style.opacity = 0;

const planet_name = document.querySelector(".planet_name")
const planet_explanation = document.querySelector(".planet_explanation")


 /**
 * Animate
 */
const clock = new THREE.Clock()

let positive = true;


/********************************************* */
/********************************************* */
/************** TICK LOOP  *********************/

const tick = () =>
{

    //raycast
    // update the picking ray with the camera and pointer position
	
    raycaster.setFromCamera( pointer, camera );

    const allObjects = [earth, jupiter, moon, mars, sun, stars];

    for (const object of allObjects) {

     
        if (object.name !== "Stars") {
            object.material.color.set( 0xffffff, 1 )
        }
            
        
        

    }
	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( allObjects );

	for (const intersect of intersects ) {

        if (intersects.length > 1) {

            intersects[0].object.material.color.set( "#b3ecff" );

            if (intersects[0].object.name === "Moon") 
            {
                info_container.style.opacity = 1
                planet_name.innerHTML = "Moon"
                planet_explanation.innerHTML = "The one and only moon of Earth. Some say it looks like a face!"
            } 
            else if (intersects[0].object.name === "Earth")  
            {
                info_container.style.opacity = 1
                planet_name.innerHTML = "Earth"
                planet_explanation.innerHTML = "The the home of the humans. A diverse place with much life."
            }
            else if (intersects[0].object.name === "Sun")  
            {
                info_container.style.opacity = 1
                planet_name.innerHTML = "Sun"
                planet_explanation.innerHTML = "Also called SOL, a star in its mid-life."
            }
            else if (intersects[0].object.name === "Jupiter")  
            {
                info_container.style.opacity = 1
                planet_name.innerHTML = "Jupiter"
                planet_explanation.innerHTML = "A gas giant with huge levels of gravity. Protects inner planets from asteroids."
            }
            else if (intersects[0].object.name === "Mars")  
            {
                info_container.style.opacity = 1
                planet_name.innerHTML = "Mars"
                planet_explanation.innerHTML = "A cold and desolate planet. Some say it maybe humanity's next home."
            }
            else 
            {
                info_container.style.opacity = 0;
            }

            intersects[0].object.material.color.set( "#b3ecff" );

        }   else {
            info_container.style.opacity = 0;
        }

        console.log(intersect.object.name)

	}

    

    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    // Update controls
    // controls.update()

    //rotate 
    earth.rotation.y = elapsedTime * 0.2;
    mars.rotation.y = elapsedTime * 0.25;
    jupiter.rotation.y = elapsedTime * 0.09
    moonObj.rotation.y = elapsedTime * 0.15
    

    //animate texture
    if (sunTexture.offset.y > 0.008) 
    {
        positive = false
    } 
    else if (sunTexture.offset.y < -0.008) 
    {
        positive = true;
    }

    positive ? 
        sunTexture.offset.y += 0.00001:
        sunTexture.offset.y -= 0.00001;
    

    sun.scale.y += Math.cos(elapsedTime) / 1000

    // Render
    renderer.render(scene, camera)

    window.addEventListener( 'pointermove', onPointerMove );
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()