// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
);

// Enhanced renderer settings
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
	powerPreference: "high-performance",
	logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

// Add HDR environment map
const rgbeLoader = new THREE.RGBELoader();
rgbeLoader.load(
	"hdri/kloofendal_48d_partly_cloudy_puresky_4k.hdr",
	function (texture) {
		texture.mapping = THREE.EquirectangularReflectionMapping;
		scene.environment = texture; // Sets the environment map for all physical materials
		scene.background = texture; // Use HDR as background

		// Adjust exposure for the bright outdoor HDR
		renderer.toneMappingExposure = 0.8; // Reduced exposure for bright outdoor HDR
	}
);

// Enhanced lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.bias = -0.0001;
scene.add(directionalLight);

// Add a second directional light for better illumination
const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.8);
secondaryLight.position.set(-5, 3, -5);
scene.add(secondaryLight);

// Add a subtle hemisphere light for ambient occlusion
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
scene.add(hemisphereLight);

// Add texture loader with enhanced settings
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "anonymous";

// Load your textures with enhanced settings
const diffuseTexture = textureLoader.load("images/GSG_SI_Scratches_04.jpg");
diffuseTexture.encoding = THREE.sRGBEncoding;
diffuseTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const aoTexture = textureLoader.load("images/GSG_SI_Scratches_04.jpg");
aoTexture.encoding = THREE.sRGBEncoding;
aoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// GLTF Loader setup
const loader = new THREE.GLTFLoader();
let mixer;
let model;

// Function to check and apply textures to a node
function applyTexturesToNode(node) {
	if (node.isMesh && node.material) {
		console.log("\nProcessing mesh:", node.name);

		// Check existing textures
		const hasDiffuse = node.material.map !== null;
		const hasAO = node.material.aoMap !== null;
		const hasNormal = node.material.normalMap !== null;
		const hasRoughness = node.material.roughnessMap !== null;
		const hasMetalness = node.material.metalnessMap !== null;

		//list name of the node and material
		console.log("Node name:", node.name);
		console.log("Material name:", node.material.name);

		// Common properties
		node.material.side = THREE.FrontSide;
		node.material.dithering = true;
		node.material.flatShading = false;
		node.material.precision = "highp";

		// Add small polygon offset to reduce z-fighting
		node.material.polygonOffset = true;
		node.material.polygonOffsetFactor = 1;
		node.material.polygonOffsetUnits = 1;

		// Ensure proper depth testing
		node.material.depthTest = true;
		node.material.depthWrite = true;

		// Add a tiny random offset to each mesh position to prevent exact overlap
		const tiny_offset = 0.0001;
		node.position.x += (Math.random() - 0.5) * tiny_offset;
		node.position.y += (Math.random() - 0.5) * tiny_offset;
		node.position.z += (Math.random() - 0.5) * tiny_offset;

		// Enable shadows with enhanced settings
		node.castShadow = true;
		node.receiveShadow = true;
	}
}

// Load the GLTF model
loader.load(
	"models/ISO TANK Animated_03-06-25/ISO Model Metal 5.gltf",
	function (gltf) {
		model = gltf.scene;
		scene.add(model);

		// Process all nodes and their children
		model.traverse((node) => {
			applyTexturesToNode(node);

			// If the node has children, process them too
			if (node.children) {
				node.children.forEach((child) => {
					applyTexturesToNode(child);
				});
			}
		});

		// Setup animations
		if (gltf.animations.length > 0) {
			mixer = new THREE.AnimationMixer(model);

			// List all available animations
			console.log("\nAvailable animations:");
			gltf.animations.forEach((clip, index) => {
				console.log(`${index}: ${clip.name}`);
			});

			// Play the first animation in yoyo mode with infinite loops
			const action = mixer.clipAction(gltf.animations[0]);
			action.setLoop(THREE.LoopPingPong, Infinity); // Set to PingPong with infinite repetitions
			action.clampWhenFinished = false;
			action.timeScale = 2;
			action.repetitions = Infinity; // Ensure infinite repetitions
			action.play();

			// Optional: Ensure smooth transitions at loop points
			action.enabled = true;
			action.paused = false;
		}

		// Optional: Adjust model position/scale if needed
		model.scale.set(1, 1, 1);
		model.position.set(0, 0, 0);
	},
	// Progress callback
	function (xhr) {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	// Error callback
	function (error) {
		console.error("An error occurred loading the model:", error);
	}
);

// Create floor with enhanced material
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
	color: 0x2c3e50, // Deep blue-gray color
	roughness: 0.7, // Slightly smoother surface
	metalness: 0.3, // Slightly more metallic
	envMapIntensity: 1.2,
	side: THREE.DoubleSide,
});

// Add subtle grid pattern to floor
const gridTexture = textureLoader.load(
	"https://threejs.org/examples/textures/grid.png"
);
gridTexture.wrapS = THREE.RepeatWrapping;
gridTexture.wrapT = THREE.RepeatWrapping;
gridTexture.repeat.set(10, 10);
gridTexture.encoding = THREE.sRGBEncoding;
floorMaterial.map = gridTexture;

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1;
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Setup OrbitControls with enhanced settings
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 1, 0);

// Position camera
camera.position.set(0, 2, 5);

// Animation loop
function animate() {
	requestAnimationFrame(animate);

	// Update controls
	controls.update();

	// Update animation mixer
	if (mixer) {
		mixer.update(0.016); // Assuming 60fps
	}

	renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
}

animate();
