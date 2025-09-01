// ./schemas/blog.js
export default {
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      validation: Rule => Rule.required()
    },
    {
      name: "banner",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "A short summary of the post",
      validation: Rule => Rule.required().max(200)
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" }, // Rich text
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "code",
          title: "Code Block",
          fields: [
            {
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "JavaScript", value: "javascript" },
                  { title: "Python", value: "python" },
                  { title: "Bash", value: "bash" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                ],
                layout: "dropdown",
              },
            },
            {
              name: "code",
              title: "Code",
              type: "text",
            },
          ],
        },
        {
          type: "object",
          name: "embed",
          title: "Embed",
          fields: [
            {
              name: "url",
              title: "Embed URL",
              type: "url",
              description: "YouTube, Twitter, or other embed URLs",
            },
          ],
        },
      ],
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "banner"
    }
  }
};
