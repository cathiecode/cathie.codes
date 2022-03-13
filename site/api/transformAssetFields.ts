import getResizedImage from "./getResizedImage";

export default async function transformAssetFields(fields: object) {
  const modifiedFields: any = { ...fields };

  const assetFields = Object.entries(modifiedFields).filter(
    ([_, field]: any) => field?.sys?.type === "Asset"
  );

  for (let [id, assetFieldUnknown] of assetFields) {
    const assetField = assetFieldUnknown as any;

    let transformedField: any = { url: assetField?.fields?.file?.url };

    if (assetField?.fields?.file?.details?.image) {
      transformedField["blurImageUrl"] = await getResizedImage(
        transformedField.url.replace("//", "https://")
      );
      transformedField["width"] = assetField.fields.file.details.image.width;
      transformedField["height"] = assetField.fields.file.details.image.height;
    }
    modifiedFields[id] = transformedField;
  }

  return modifiedFields;
}
