const INITAIL_COLOR = '2c2c2c';
const CANVAS_SIZE = 700;

const canvas = document.getElementById('jsCanvas');
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = 'fill';
  } else {
    filling = true;
    mode.innerText = 'paint';
  }
}

function handleCanvasClick(event) {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'download';
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (save) {
  save.addEventListener('click', handleSaveClick);
}
