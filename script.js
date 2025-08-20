const pixels = [
  [7,6,0],
  [8,6,0],
  [9,6,0],
  [10,6,0],
  [11,6,0],
  [5,7,0],
  [6,7,0],
  [7,7,3],
  [8,7,3],
  [9,7,3],
  [10,7,3],
  [11,7,4],
  [12,7,0],
  [4,8,0],
  [5,8,2],
  [6,8,2],
  [7,8,2],
  [8,8,2],
  [9,8,2],
  [10,8,3],
  [11,8,3],
  [12,8,4],
  [13,8,0],
  [5,9,0],
  [6,9,2],
  [7,9,2],
  [8,9,2],
  [9,9,2],
  [10,9,2],
  [11,9,3],
  [12,9,3],
  [13,9,4],
  [14,9,0],
  [21,9,0],
  [22,9,0],
  [23,9,0],
  [24,9,0],
  [25,9,0],
  [6,10,0],
  [7,10,2],
  [8,10,2],
  [9,10,2],
  [10,10,2],
  [11,10,2],
  [12,10,3],
  [13,10,3],
  [14,10,0],
  [19,10,0],
  [20,10,0],
  [21,10,4],
  [22,10,3],
  [23,10,3],
  [24,10,3],
  [25,10,3],
  [26,10,0],
  [6,11,0],
  [7,11,2],
  [8,11,2],
  [9,11,2],
  [10,11,2],
  [11,11,2],
  [12,11,2],
  [13,11,3],
  [14,11,3],
  [15,11,0],
  [18,11,0],
  [19,11,4],
  [20,11,3],
  [21,11,3],
  [22,11,3],
  [23,11,2],
  [24,11,2],
  [25,11,2],
  [26,11,2],
  [27,11,0],
  [7,12,0],
  [8,12,2],
  [9,12,2],
  [10,12,2],
  [11,12,2],
  [12,12,2],
  [13,12,2],
  [14,12,3],
  [15,12,0],
  [17,12,0],
  [18,12,4],
  [19,12,3],
  [20,12,3],
  [21,12,2],
  [22,12,2],
  [23,12,2],
  [24,12,2],
  [25,12,2],
  [26,12,0],
  [7,13,0],
  [8,13,1],
  [9,13,2],
  [10,13,2],
  [11,13,2],
  [12,13,2],
  [13,13,2],
  [14,13,2],
  [15,13,1],
  [16,13,0],
  [17,13,1],
  [18,13,3],
  [19,13,2],
  [20,13,2],
  [21,13,2],
  [22,13,2],
  [23,13,2],
  [24,13,2],
  [25,13,0],
  [8,14,0],
  [9,14,1],
  [10,14,1],
  [11,14,2],
  [12,14,2],
  [13,14,2],
  [14,14,1],
  [15,14,1],
  [16,14,0],
  [17,14,1],
  [18,14,1],
  [19,14,2],
  [20,14,2],
  [21,14,2],
  [22,14,1],
  [23,14,1],
  [24,14,0],
  [9,15,0],
  [10,15,0],
  [11,15,1],
  [12,15,1],
  [13,15,1],
  [14,15,1],
  [15,15,1],
  [16,15,1],
  [17,15,1],
  [18,15,1],
  [19,15,1],
  [20,15,1],
  [21,15,1],
  [22,15,0],
  [23,15,0],
  [11,16,0],
  [12,16,0],
  [13,16,0],
  [14,16,0],
  [15,16,0],
  [16,16,1],
  [17,16,0],
  [18,16,0],
  [19,16,0],
  [20,16,0],
  [21,16,0],
  [15,17,0],
  [16,17,1],
  [17,17,0],
  [15,18,0],
  [16,18,1],
  [17,18,0],
  [15,19,0],
  [16,19,1],
  [17,19,0],
  [15,20,0],
  [16,20,1],
  [17,20,0],
  [15,21,0],
  [16,21,1],
  [17,21,0],
  [14,22,0],
  [15,22,2],
  [16,22,0],
  [14,23,0],
  [15,23,2],
  [16,23,0],
  [14,24,0],
  [15,24,2],
  [16,24,0],
  [13,25,0],
  [14,25,3],
  [15,25,0],
  [13,26,0],
  [14,26,3],
  [15,26,0],
  [14,27,0]
];

const grid = document.getElementById('grid');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colors = ['#cc1111', '#ee1111', '#ff3333', '#ff5555', '#ff9999'];
let curr = 0;

const cells = [];
for (let i = 0; i < 32 * 32; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cells.push(cell);
  grid.appendChild(cell);
}

const colorPickerOverlay = document.getElementById('colorPickerOverlay');
const sv = document.getElementById('sv');
const hue = document.getElementById('hue');
const svCtx = sv.getContext('2d');
const hueCtx = hue.getContext('2d');
const svThumb = document.getElementById('svThumb');
const hueLine = document.getElementById('hueLine');
const preview = document.getElementById('preview');
const hexInput = document.getElementById('hex');
const rgbInput = document.getElementById('rgb');
const hsvInput = document.getElementById('hsv');

let h = 0, s = 1, v = 1;

function hsvToRgb(h, s, v) {
  let f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5) * 255, f(3) * 255, f(1) * 255];
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0, s = max === 0 ? 0 : d / max, v = max;
  if (d) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, v];
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b]
    .map(x => Math.round(x).toString(16).padStart(2, "0"))
    .join("");
}

function hexToRgb(hex) {
  let v = hex.replace("#", "");
  if (v.length === 3) v = v.split("").map(x => x + x).join("");
  if (v.length !== 6) return null;
  return [
    parseInt(v.substr(0, 2), 16),
    parseInt(v.substr(2, 2), 16),
    parseInt(v.substr(4, 2), 16)
  ];
}

function drawHue() {
  let g = hueCtx.createLinearGradient(0, 0, hue.width, 0);
  for (let i = 0; i <= 360; i += 60) {
    g.addColorStop(i / 360, `hsl(${i},100%,50%)`);
  }
  hueCtx.fillStyle = g;
  hueCtx.fillRect(0, 0, hue.width, hue.height);
}

function drawSV() {
  const [r, g, b] = hsvToRgb(h, 1, 1);
  svCtx.fillStyle = `rgb(${r},${g},${b})`;
  svCtx.fillRect(0, 0, sv.width, sv.height);

  let g1 = svCtx.createLinearGradient(0, 0, sv.width, 0);
  g1.addColorStop(0, "#fff");
  g1.addColorStop(1, "transparent");
  svCtx.fillStyle = g1;
  svCtx.fillRect(0, 0, sv.width, sv.height);

  let g2 = svCtx.createLinearGradient(0, 0, 0, sv.height);
  g2.addColorStop(0, "transparent");
  g2.addColorStop(1, "#000");
  svCtx.fillStyle = g2;
  svCtx.fillRect(0, 0, sv.width, sv.height);
}

function updateColorPickerUI() {
  const [rr, gg, bb] = hsvToRgb(h, s, v);
  const hex = rgbToHex(rr, gg, bb);

  preview.style.background = hex;
  hexInput.value = hex;
  rgbInput.value = `${Math.round(rr)},${Math.round(gg)},${Math.round(bb)}`;
  hsvInput.value = `${Math.round(h)},${Math.round(s * 100)},${Math.round(v * 100)}`;

  svThumb.style.left = (s * sv.width) + "px";
  svThumb.style.top = ((1 - v) * sv.height) + "px";
  hueLine.style.left = (h / 360 * hue.width) + "px";
}

function renderColorPicker() {
  drawHue();
  drawSV();
  updateColorPickerUI();
}

function pickSV(e) {
  const rect = sv.getBoundingClientRect();
  s = Math.max(0, Math.min(1, e.offsetX / rect.width));
  v = 1 - Math.max(0, Math.min(1, e.offsetY / rect.height));
  renderColorPicker();
}

function pickHue(e) {
  const rect = hue.getBoundingClientRect();
  h = Math.max(0, Math.min(1, e.offsetX / rect.width)) * 360;
  renderColorPicker();
}

sv.addEventListener("mousedown", (e) => {
  pickSV(e);
  const mv = e => pickSV(e);
  window.addEventListener("mousemove", mv);
  window.addEventListener("mouseup", () => window.removeEventListener("mousemove", mv), { once: true });
});

hue.addEventListener("mousedown", (e) => {
  pickHue(e);
  const mv = e => pickHue(e);
  window.addEventListener("mousemove", mv);
  window.addEventListener("mouseup", () => window.removeEventListener("mousemove", mv), { once: true });
});

hexInput.addEventListener("change", () => {
  const rgb = hexToRgb(hexInput.value);
  if (!rgb) return;
  [h, s, v] = rgbToHsv(...rgb);
  renderColorPicker();
});

rgbInput.addEventListener("change", () => {
  let [r, g, b] = rgbInput.value.split(",").map(Number);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return;
  [h, s, v] = rgbToHsv(r, g, b);
  renderColorPicker();
});

hsvInput.addEventListener("change", () => {
  let [hh, ss, vv] = hsvInput.value.split(",").map(Number);
  if (isNaN(hh) || isNaN(ss) || isNaN(vv)) return;
  h = hh; s = ss / 100; v = vv / 100;
  renderColorPicker();
});

function render() {
  cells.forEach(cell => cell.style.background = '#fff');

  for (const [x, y, c] of pixels) {
    const idx = y * 32 + x;
    cells[idx].style.background = colors[c];

    ctx.fillStyle = colors[c];
    ctx.fillRect(x, y, 1, 1);
  }
}

function resizeCanvases() {
  sv.width = sv.clientWidth;
  sv.height = sv.clientHeight;
  hue.width = hue.clientWidth;
  hue.height = hue.clientHeight;
}

function showColorPicker(colorIndex) {
  curr = colorIndex;
  const currentColor = colors[colorIndex];
  const rgb = hexToRgb(currentColor);
  if (rgb) {
    [h, s, v] = rgbToHsv(...rgb);
  }

  document.querySelectorAll('.color-swatch').forEach(swatch => swatch.classList.remove('active'));
  document.getElementById(`swatch-${colorIndex}`).classList.add('active');

  colorPickerOverlay.classList.add('active');
  resizeCanvases();
  renderColorPicker();
}

function hideColorPicker() {
  colorPickerOverlay.classList.remove('active');
  document.querySelectorAll('.color-swatch').forEach(swatch => swatch.classList.remove('active'));
}

function applyColor() {
  const newColor = hexInput.value;
  colors[curr] = newColor;
  document.getElementById(`swatch-${curr}`).style.background = newColor;
  render();
  hideColorPicker();
}

document.querySelectorAll('.controls label').forEach(label => {
  label.addEventListener('click', (e) => {
    e.preventDefault();
    const colorIndex = parseInt(label.getAttribute('data-color'));
    showColorPicker(colorIndex);
  });
});

document.getElementById('closeColorPicker').addEventListener('click', hideColorPicker);
document.getElementById('cancelColor').addEventListener('click', hideColorPicker);
document.getElementById('applyColor').addEventListener('click', applyColor);

colorPickerOverlay.addEventListener('click', (e) => {
  if (e.target === colorPickerOverlay) {
    hideColorPicker();
  }
});

document.getElementById('download').addEventListener('click', () => {
  const filename = document.getElementById('filename').value || '7chicha';
  const link = document.createElement('a');
  const scale = 16;
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 32 * scale;
  tempCanvas.height = 32 * scale;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.imageSmoothingEnabled = false;
  tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

  link.href = tempCanvas.toDataURL('image/png');
  link.download = filename + '.png';
  link.click();
});

render();