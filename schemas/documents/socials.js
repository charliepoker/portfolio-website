// socials.js
export default {
  name: 'socials',
  title: 'Social Links',
  type: 'document',
  fields: [
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Platform Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'url'
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      links: 'links'
    },
    prepare({ links }) {
      return {
        title: 'Social Links',
        subtitle: links && links.length
          ? `${links.length} link${links.length > 1 ? 's' : ''}`
          : 'No links added yet'
      }
    }
  }
}
