const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const tokenIdInput = document.getElementById('tokenIdInput');
const overlaySelector = document.getElementById('overlaySelector');
const fetchBtn = document.getElementById('fetchBtn');
const downloadBtn = document.getElementById('downloadBtn');

let baseImage = new Image();
let overlayImage = new Image();

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (baseImage.src) {
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  }
  if (overlayImage.src) {
    ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
  }
}

function loadByTokenId(tokenId) {
  const paddedId = tokenId.padStart(3, '0');
  const imageUrl = `assets/prime8s/${paddedId}.png`;

  baseImage = new Image();
  baseImage.crossOrigin = 'anonymous';
  baseImage.onload = drawCanvas;
  baseImage.onerror = () => {
    alert('Prime8 image not found!');
  };
  baseImage.src = imageUrl;
}

fetchBtn.addEventListener('click', () => {
  const tokenId = tokenIdInput.value.trim();
  if (!tokenId) return alert('Please enter a token ID');
  loadByTokenId(tokenId);
});

overlaySelector.addEventListener('change', () => {
  if (overlaySelector.value) {
    overlayImage = new Image();
    overlayImage.onload = drawCanvas;
    overlayImage.src = overlaySelector.value;
  } else {
    overlayImage = new Image();
    drawCanvas();
  }
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'prime8-customized.png';
  link.href = canvas.toDataURL();
  link.click();
});
