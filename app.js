const fish = document.getElementById('fish');

// 鱼现在在哪
let fishX = 0;
let fishY = 0;

// 鼠标现在在哪
let mouseX = 0;
let mouseY = 0;

// 每一帧挪多少（0~1，越大越快）
const SPEED = 0.08;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // 朝鼠标走一步，但不是一步到位，只走一小段
  fishX += (mouseX - fishX) * SPEED;
  fishY += (mouseY - fishY) * SPEED;

  fish.style.transform = `translate(${fishX}px, ${fishY}px)`;

  requestAnimationFrame(animate);
}

animate();
