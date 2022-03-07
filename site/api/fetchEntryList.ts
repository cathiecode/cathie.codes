import fetchContentful from "./fetchContenteful";

export default async function fetchEntryList(
  content_type: string,
  query: string = ""
) {
  const response = await fetchContentful(
    ({ environment_id, access_token, space_id }) =>
      `/spaces/${space_id}/environments/${environment_id}/entries?access_token=${access_token}&content_type=${content_type}&${query}`
  );

  const items = response["items"].map((item: any) => ({
    ...item.sys,
    ...item.fields,
  }));

  return {
    items: items,
    raw: response,
  };
}
