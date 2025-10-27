// === Sélection du canvas existant ===
const canvas = document.getElementById('background');

// === SCÈNE, CAMÉRA, RENDERER ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

// === GÉOMÉTRIE : Tétraèdre (pyramide) ===
const geometry = new THREE.TetrahedronGeometry(1);

const materialFaces = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0,
  side: THREE.DoubleSide
});

const materialEdges = new THREE.LineBasicMaterial({ color: 0x000000 });
const mesh = new THREE.Mesh(geometry, materialFaces);
const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), materialEdges);

const pyramid = new THREE.Group();
pyramid.add(mesh);
pyramid.add(edges);
scene.add(pyramid);

camera.position.z = 3;

// === Lumière ===
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// === Animation ===
function animate() {
  requestAnimationFrame(animate);
  pyramid.rotation.x += 0.01;
  pyramid.rotation.y += 0.008;
  pyramid.rotation.z += 0.005;
  renderer.render(scene, camera);
}
animate();

// === Ajustement taille ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
