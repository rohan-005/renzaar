import JSZip from "jszip";

export async function extractZip(file: File) {
  const zip = await JSZip.loadAsync(file);
  let thumbnail = "";
  let modelUrl = "";

  for (const [filename, zipEntry] of Object.entries(zip.files)) {
    if (filename.endsWith(".png") || filename.endsWith(".jpg")) {
      const blob = await zipEntry.async("blob");
      thumbnail = URL.createObjectURL(blob);
    }
    if (
      filename.endsWith(".glb") ||
      filename.endsWith(".gltf") ||
      filename.endsWith(".obj")
    ) {
      const blob = await zipEntry.async("blob");
      modelUrl = URL.createObjectURL(blob);
    }
  }

  return { thumbnail, modelUrl };
}
