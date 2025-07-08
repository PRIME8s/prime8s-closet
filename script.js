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

async function loadByTokenId(tokenId) {
  const contract = '0xf0de01e6f7d67f2e82e86913abca7c1bd062a774';
  const url = `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Token not found');
    const json = await res.json();
    let imageUrl = json.image_url || json.image;

    if (imageUrl.startsWith('ipfs://')) {
      imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }

    baseImage = new Image();
    baseImage.crossOrigin = 'anonymous';
    baseImage.onload = drawCanvas;
    baseImage.src = imageUrl;
  } catch (e) {
    alert('Error loading token: ' + e.message);
  }
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
