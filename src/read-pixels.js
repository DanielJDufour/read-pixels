const getImage = src => new Promise((resolve, reject) => {
  const img = document.createElement("img");
  img.onload = () => resolve(img);
  img.onerror = () => reject("Image not loaded");
  img.src = src;
});

const readPixels = async ({ data, debug=false }) => {
  if (debug) console.log("[read-pixels] starting to read with", { data, debug });

  // pre-processing
  if (data instanceof Promise) data = await data;

  if (typeof data === "object" && typeof data.arrayBuffer === "function") {
    data = await data.arrayBuffer();
  } else if (typeof data === "object" && data.buffer instanceof ArrayBuffer) {
    data = data.buffer;
  }

  let blob, src, tempurl;
  if (data instanceof ArrayBuffer) {
    if (typeof Blob !== "undefined") {
      blob = new Blob([data], { type: "image/png" });
      src = tempurl = URL.createObjectURL(blob);
    }
  } else if (typeof data === "string" && data.startsWith("data:")) {
    src = data;
  } 

  const img = await getImage(src);
  if (debug) console.log("[read-pixels] img:", img);

  const { height, width } = img;

  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  if (debug) console.log("[read-pixels] imageData:", imageData);
  const { data: pixels } = imageData;
  if (debug) console.log("[read-pixels] pixels:", pixels);

  if (tempurl) {
    if (debug) console.log("[read-pixels] revoking temporary url:", tempurl);
    URL.revokeObjectURL(tempurl);
  }  

  const result = {
    height,
    pixels,
    width
  };

  if (debug) console.log("[read-pixels] finishing with", result);
  return result;
}

if (typeof window !== 'undefined') window.readPixels = readPixels;
if (typeof module !== 'undefined') module.exports = readPixels;
if (typeof self !== 'undefined') self.readPixels = readPixels;
