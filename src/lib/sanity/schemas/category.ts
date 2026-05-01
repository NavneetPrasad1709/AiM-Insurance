export const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "color",
      title: "Accent color",
      type: "string",
      options: {
        list: [
          { title: "Citrine", value: "citrine" },
          { title: "Mint", value: "mint" },
          { title: "Ember", value: "ember" },
          { title: "Bone", value: "bone" },
        ],
      },
      initialValue: "citrine",
    },
  ],
};
