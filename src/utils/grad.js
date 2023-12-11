const md5 = require('md5');


function grad(seed, hue) {
  // Math.abs((seed || '').split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));
  const autoHue = parseInt(md5(seed || "default").slice(0, 8), 16) % 270 + 90;
  const bubbleHue = hue ? parseInt(hue, 10) : autoHue;
  return `linear-gradient(45deg, hsl(${bubbleHue}deg 79% 62%) 0%, hsl(${bubbleHue + 45}deg 49% 62%) 100%)`;
}

export default grad;
