import fetch from "node-fetch";
import sharp from "sharp";

export default async function getResizedImage(url: string) {
  const imageRequest = await fetch(url);

  /* if (process.env.NODE_ENV === "development") {
    return url;
  } */

  if (!imageRequest.ok) {
    throw new Error("Failed to fetch image");
  }

  const buffer = new Uint8Array(await imageRequest.arrayBuffer());

  const result =
    "data:image/png;base64," +
    (
      await sharp(buffer)
        .resize(16)
        .png({
          compressionLevel: 0,
          colors: 8,
          palette: true,
        })
        .toBuffer()
    ).toString("base64");

  return result;
}
