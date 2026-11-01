// ============================================================
// app.js —— 页面会动的地方全在这儿
// 1 小鱼跟鼠标   2 像素雨
// ============================================================

const fish = document.getElementById('fish');

let fishX = 0;
let fishY = 0;
let mouseX = 0;
let mouseY = 0;

const SPEED = 0.08;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  fishX += (mouseX - fishX) * SPEED;
  fishY += (mouseY - fishY) * SPEED;
  fish.style.transform = `translate(${fishX}px, ${fishY}px)`;
  requestAnimationFrame(animate);
}

animate();

// ---------- 像素雨 ----------
// 三层：远的细密、中的普通、近的粗壮发亮。
// 每滴雨不是一张图，是一串「硬边渐变」切出来的像素块。

const rainBox = document.getElementById('rain');

const layers = [
  { count: 26, minW: 1, maxW: 1, minH: 10, maxH: 18, a: [0.10, 0.22], dur: [7, 10],  steps: 10 },
  { count: 34, minW: 2, maxW: 2, minH: 14, maxH: 26, a: [0.20, 0.38], dur: [5, 8],   steps: 12 },
  { count: 18, minW: 3, maxW: 4, minH: 22, maxH: 40, a: [0.35, 0.60], dur: [3.5, 6], steps: 8  },
];

const rx = (min, max) => min + Math.random() * (max - min);

layers.forEach((layer) => {
  for (let i = 0; i < layer.count; i++) {
    const drop = document.createElement('div');

    const w = rx(layer.minW, layer.maxW);
    const h = rx(layer.minH, layer.maxH);
    const alpha = rx(layer.a[0], layer.a[1]);
    const dur = rx(layer.dur[0], layer.dur[1]);

    // 把一滴雨切成若干段，段与段之间留透明缝 → 看起来就是一格格的像素
    const seg = Math.max(2, Math.round(h / 6));
    const stops = [];
    for (let s = 0; s < seg; s++) {
      stops.push(`rgba(79,195,247,${alpha}) ${(s / seg) * 100}% ${((s + 0.6) / seg) * 100}%`);
      if (s < seg - 1) {
        stops.push(`transparent ${((s + 0.6) / seg) * 100}% ${((s + 1) / seg) * 100}%`);
      }
    }

    drop.style.cssText =
      `position:absolute;` +
      `left:${Math.random() * 100}%;` +
      `top:-60px;` +
      `width:${w}px;` +
      `height:${h}px;` +
      `background:linear-gradient(180deg,${stops.join(',')});` +
      `box-shadow:0 0 6px rgba(79,195,247,${alpha * 0.8});` +
      `animation:pixelRain ${dur}s steps(${layer.steps}) ${-Math.random() * dur}s infinite;` +
      `will-change:transform;`;

    rainBox.appendChild(drop);
  }
});
