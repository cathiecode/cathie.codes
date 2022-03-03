import fetchContentful from "./fetchContenteful";
import fetchContentfulImage from "./fetchContentfulImage";
import { encode } from "base64-arraybuffer";

export type ImageMetadata = {
  width: number;
  height: number;
  placeholder: string;
};

export default async function fetchContentfulImageMetadata(
  url: string
): Promise<ImageMetadata | undefined> {
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname !== "images.ctfassets.net") {
    return;
  }

  const [_, spaceId, assetId, uniqueId, title] = parsedUrl.pathname.split("/");

  if (([spaceId, assetId, uniqueId, title] as any[]).includes(undefined)) {
    return;
  }

  console.log(
    `/spaces/${spaceId}/environments/.../assets/${assetId}?access_token=...`
  );

  const result = await fetchContentful(
    ({ access_token, environment_id }) =>
      `/spaces/${spaceId}/environments/${environment_id}/assets/${assetId}?access_token=${access_token}`
  );

  const placeholder = await fetchContentfulImage(
    () => parsedUrl.pathname + "?fm=png&w=16&h=16"
  );

  return {
    width: result.fields.file.details.image.width,
    height: result.fields.file.details.image.height,
    placeholder: `data:${placeholder.headers.get(
      "content-type"
    )};base64,${encode(await placeholder.arrayBuffer())}`,
  };
}
