let container, scene, renderer, camera, statue;

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
});

window.addEventListener("resize", resize);

init();

function resize() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
hamburger.addEventListener("click", (e) => {
  let lines = hamburger.children;
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.toggle("toggle");
  }
  menu.classList.toggle("toggle");
});

//nav dot
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const navDot = document.querySelectorAll(".nav-dot");
navDot[0].classList.add("active");
let lastActive = 0;

navDot.forEach((elm, i) => {
  elm.addEventListener("click", () => {
    navDot[lastActive].classList.remove("active");
    elm.classList.add("active");
    lastActive = i;
  });
});

//handling input search
const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("focus", () => {
  searchInput.parentElement.style.width = "256px";
});

searchInput.addEventListener("focusout", () => {
  searchInput.parentElement.style.width = "32px";
  searchInput.value = "";
});
