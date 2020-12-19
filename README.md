# read-pixels
> Super Lightweight Function to Read Pixels in the Browser

Reads Pixels from JPG, PNG, and WebP Files in Multiple Formats, including ArrayBuffer, Data URL, Files, Response, and Typed Array.

# install
```bash
npm install read-pixels
```

# usage in a module
```js
import readPixels from 'read-pixels';

const response = await fetch("./flower.png");
const result = await readPixels({ data: response, debug: true });
// result is { height: 100, width: 100, pixels: ClampedUint8Array[....] }
```
