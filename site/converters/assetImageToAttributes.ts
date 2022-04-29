import getResizedImage from "api/getResizedImage";
import { Asset } from "contentful";

export default async function assetImageToAttributes(asset: Asset) {
  if (asset.fields.file.details.image === undefined) {
    throw new Error(
      `No such image ${asset.fields.title}(${asset.fields.file.fileName})`
    );
  }
  return {
    src: asset.fields.file.url,
    blurImageUrl: await getResizedImage("https:" + asset.fields.file.url),
    width: asset.fields.file.details.image.width,
    height: asset.fields.file.details.image.height,
  };
}
