import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "aim-insurance-cms",
  title: "AiM Insurance CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Posts")
              .child(
                S.documentTypeList("post")
                  .title("Posts")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
              ),
            S.listItem()
              .title("Categories")
              .child(S.documentTypeList("category").title("Categories")),
            S.listItem()
              .title("Authors")
              .child(S.documentTypeList("author").title("Authors")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
