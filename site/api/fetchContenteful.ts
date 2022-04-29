export default async function fetchContentful<T>(
  pathGenerator: (env: {
    space_id: string;
    access_token: string;
    environment_id: string;
  }) => string
): Promise<{ [key: string | number]: any }> {
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_ACCESS_TOKEN ||
    !process.env.CONTENTFUL_ENVIRONMENT
  ) {
    throw new Error(
      "contentful space id, access token or environment key was not specified."
    );
  }

  const path = pathGenerator({
    space_id: process.env.CONTENTFUL_SPACE_ID,
    access_token: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment_id: process.env.CONTENTFUL_ENVIRONMENT,
  });

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  const result = await fetch("https://cdn.contentful.com/" + normalizedPath);

  if (!result.ok) {
    console.error(result.status, normalizedPath);
    throw new Error("Failed to fetch contents");
  }

  return (await result.json()) as T;
}
