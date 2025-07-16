const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const tokenIdInput = document.getElementById('tokenIdInput');
const fetchBtn = document.getElementById('fetchBtn');
const downloadBtn = document.getElementById('downloadBtn');

const headgearSelector = document.getElementById('headgearSelector');
const handSelector = document.getElementById('handSelector');
const effectSelector = document.getElementById('effectSelector');

let backgroundImage = new Image();
let FurImage = new Image();
let baseImage = new Image();
let headgearImg = new Image();
let handImg = new Image();
let effectImg = new Image();

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (baseImage.src) ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  if (headgearImg.src) ctx.drawImage(headgearImg, 0, 0, canvas.width, canvas.height);
  if (handImg.src) ctx.drawImage(handImg, 0, 0, canvas.width, canvas.height);
  if (effectImg.src) ctx.drawImage(effectImg, 0, 0, canvas.width, canvas.height);
}

function loadByTokenId(tokenId) {
  const paddedId = tokenId.padStart(0, '0');
  const imageUrl = `assets/prime8s/${paddedId}.webp`;

  baseImage = new Image();
  baseImage.crossOrigin = 'anonymous';
  baseImage.onload = drawCanvas;
  baseImage.onerror = () => alert('Prime8 image not found!');
  baseImage.src = imageUrl;
}

fetchBtn.addEventListener('click', () => {
  const tokenId = tokenIdInput.value.trim();
  if (!tokenId) return alert('Please enter a token ID');
  loadByTokenId(tokenId);
});

headgearSelector.addEventListener('change', () => {
  BackgroundImg = new Image();
  BackgroundImg.onload = drawCanvas;
  BackgroundImg.src = headgearSelector.value;
});

});

headgearSelector.addEventListener('change', () => {
  FurImg = new Image();
  FurImg.onload = drawCanvas;
  FurImg.src = headgearSelector.value;
});

});

headgearSelector.addEventListener('change', () => {
  headgearImg = new Image();
  headgearImg.onload = drawCanvas;
  headgearImg.src = headgearSelector.value;
});

handSelector.addEventListener('change', () => {
  handImg = new Image();
  handImg.onload = drawCanvas;
  handImg.src = handSelector.value;
});

effectSelector.addEventListener('change', () => {
  effectImg = new Image();
  effectImg.onload = drawCanvas;
  effectImg.src = effectSelector.value;
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'prime8-customized.png';
  link.href = canvas.toDataURL();
  link.click();
});
