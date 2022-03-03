export default async function fetchMicroCms(
  path: string
): Promise<{ [key: string | number]: any }> {
  if (!process.env.MICROCMS_ENDPOINT || !process.env.MICROCMS_API_KEY) {
    throw new Error("microCMS endpoint or api key was not specified.");
  }

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  const result = await fetch(
    `${process.env.MICROCMS_ENDPOINT}/${normalizedPath}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY ?? "",
      },
    }
  );

  if (!result.ok) {
    console.error(result.status);
    throw new Error("Failed to fetch top page");
  }

  return await result.json();
}
