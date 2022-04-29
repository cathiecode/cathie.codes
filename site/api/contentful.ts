import { createClient } from "contentful";

if (
  !process.env.CONTENTFUL_SPACE_ID ||
  !process.env.CONTENTFUL_ACCESS_TOKEN ||
  !process.env.CONTENTFUL_ENVIRONMENT
) {
  throw new Error(
    "contentful space id, access token or environment key was not specified."
  );
}

const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
});

export default contentful;
