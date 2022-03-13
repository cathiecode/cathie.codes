export default async function fetchContentfulImage(
  pathGenerator: (env: {
    space_id: string;
    access_token: string;
    environment_id: string;
  }) => string
): Promise<Response> {
  if (
    !process.env.CONTENTFUL_SPACE_ID ||
    !process.env.CONTENTFUL_ACCESS_TOKEN ||
    !process.env.CONTENTFUL_ENVIRONMENT_ID
  ) {
    throw new Error(
      "contentful space id, access token or environment key was not specified."
    );
  }

  const path = pathGenerator({
    space_id: process.env.CONTENTFUL_SPACE_ID,
    access_token: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment_id: process.env.CONTENTFUL_ENVIRONMENT_ID,
  });

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  const result = await fetch("https://images.ctfassets.net/" + normalizedPath);

  if (!result.ok) {
    throw new Error("Failed to fetch contents");
  }

  return result;
}
