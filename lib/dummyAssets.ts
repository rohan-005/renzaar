export type Asset = {
  id: number;
  name: string;
  thumbnail: string;
  modelUrl: string;
  zipUrl: string;
};

export const dummyAssets: Asset[] = [
  {
    id: 1,
    name: "Duck",
    thumbnail: "/dummy/123.jpg", // matches public/dummy/123.jpg
    modelUrl: "/dummy/building-a.glb", // matches public/dummy/IDLE.glb
    zipUrl: "/dummy/New Folder.zip", // matches public/dummy/Skeleton.zip
  },
  // {
  //   id: 2,
  //   name: "Duck",
  //   thumbnail: "/dummy/123.jpg",
  //   modelUrl: "/dummy/IDLE.glb",
  //   zipUrl: "/dummy/Skeleton.zip",
  // },
];
