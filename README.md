# read-pixels
> Super Lightweight Function to Read Pixels in the Browser

Reads Pixels from JPG, PNG, and WebP Files in Multiple Formats, including ArrayBuffer, Data URL, Files, Response, and Typed Array.

# why?
:zero: Zero Dependencies 

:rocket: Super Lightweight at 1.24 KB File Size

# install
```bash
npm install read-pixels
```

# usage
```javascript
import readPixels from 'read-pixels';

// reading array buffer
const result = await readPixels({
  data: await fetch("./flower.png").then(r => r.arrayBuffer()),
  debug: true // set debug to true for more logging
});
// result is { height: 100, width: 100, pixels: ClampedUint8Array[....] }

// reading Response
const result = await readPixels({
  data: fetch("./flower.png"),
  debug: true // set debug to true for more logging
});
// result is { height: 100, width: 100, pixels: ClampedUint8Array[....] }

// reading data url
const result = await readPixels({
  data: "data:image/png;base64,...",
  debug: true // set debug to true for more logging
});
// result is { height: 100, width: 100, pixels: ClampedUint8Array[....] }
```
