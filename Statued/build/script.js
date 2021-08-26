let container,
  scene,
  renderer,
  camera,
  statue,
  mouseY = 0,
  mouseX = 0;

function init() {
  container = document.querySelector(".scene");

  //create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const nearLimit = 0.1;
  const farLimit = 500;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, nearLimit, farLimit);
  camera.position.set(0, 2.5, 9);

  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(20, 10, 40);
  light.castShadow = true;
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  //Load model
  let loader = new THREE.OBJLoader();
  loader.load("3d.OBJ", function (obj) {
    obj.traverse(function (ob) {
      if (ob.isMesh) {
        ob.material.color.set(0x505050);
      }
    });

    scene.add(obj);
    statue = obj.children[0];
    renderer.render(scene, camera);

    animate();
  });
}

let rotation = 0;
function animate() {
  requestAnimationFrame(animate);

  statue.rotation.y = rotation;

  renderer.render(scene, camera);
}

let body = document.querySelector("body");
document.addEventListener("mousemove", (e) => {
  if (e.clientX < body.clientWidth / 2) {
    rotation = -Math.abs(e.clientX - body.clientWidth / 2) / 1000;
  } else {
    rotation = Math.abs(e.clientX - body.clientWidth / 2) / 1000;
  }
  mouseX = e.clientX;
});

init();
