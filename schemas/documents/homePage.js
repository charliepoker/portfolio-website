// ./schemas/homePage.js
export default {
  name: "homePage",
  title: "Homepage",
  type: "document",
  // Add this preview configuration
  preview: {
    select: {
      firstName: 'hero.firstName',
      lastName: 'hero.lastName'
    },
    prepare(selection) {
      const { firstName, lastName } = selection
      return {
        title: `Homepage - ${firstName} ${lastName}`,
        subtitle: 'Website Homepage Content'
      }
    }
  },
  fields: [
    // HERO SECTION
    {
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        { name: "firstName", type: "string", title: "First Name" },
        { name: "lastName", type: "string", title: "Last Name" },
        { name: "role", type: "string", title: "Role" },
        { name: "description", type: "text", title: "Description" },
        {
          name: "heroImage",
          type: "image",
          title: "Hero Image",
          options: { hotspot: true },
        },
        {
          name: "cta",
          title: "CTA Button",
          type: "object",
          fields: [
            { name: "text", type: "string", title: "Button Text" },
            { name: "url", type: "url", title: "Button URL" },
          ],
        },
        {
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "platform", type: "string", title: "Platform" },
                { name: "url", type: "url", title: "URL" },
              ],
            },
          ],
        },
      ],
    },
    // ... rest of your fields remain the same
    {
      name: "technicalProficiencies",
      title: "Technical Proficiencies", 
      type: "object",
      fields: [
        { name: "sectionTitle", type: "string", title: "Section Title" },
        {
          name: "proficiencies",
          title: "Proficiencies",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "num", type: "string", title: "Number" },
                { name: "title", type: "string", title: "Title" },
                { name: "description", type: "text", title: "Description" },
              ],
            },
          ],
        },
        {
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "value", type: "number", title: "Value" },
                { name: "label", type: "string", title: "Label" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "toolsAndSoftware",
      title: "Tools & Software",
      type: "object",
      fields: [
        { name: "sectionTitle", type: "string", title: "Section Title" },
        {
          name: "firstMarquee",
          title: "First Marquee Tools",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
        },
        {
          name: "secondMarquee",
          title: "Second Marquee Tools",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
        },
      ],
    },
    {
      name: "latestPublications",
      title: "Latest Publications",
      type: "object",
      fields: [
        { name: "sectionTitle", type: "string", title: "Section Title" },
        {
          name: "articles",
          title: "Articles",
          type: "array",
          of: [{ type: "reference", to: [{ type: "blog" }] }],
        },
      ],
    },
  ],
};