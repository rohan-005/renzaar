export interface Asset {
  _id?: string;
  name: string;
  description?: string;
  thumbnailUrl: string;
  modelUrl: string;
  zipUrl: string;
  ownerId: string;
  createdAt: Date;
}
