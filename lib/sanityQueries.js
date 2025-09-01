// ./lib/sanityQueries.js
import { groq } from "next-sanity";
import { client } from "./sanity"; // adjust path if needed

export async function getBlogCount() {
  return await client.fetch(
    groq`count(*[_type == "blog"])`
  );
}
