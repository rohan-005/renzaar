/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'three/examples/jsm/loaders/GLTFLoader' {
  export class GLTFLoader {
    load(url: string, onLoad: (gltf: any) => void, onProgress?: (xhr: any) => void, onError?: (error: any) => void): void;
  }
}

declare module 'three/examples/jsm/loaders/OBJLoader' {
  export class OBJLoader {
    load(url: string, onLoad: (obj: any) => void, onProgress?: (xhr: any) => void, onError?: (error: any) => void): void;
  }
}
