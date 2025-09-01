// schemas/resume.js
export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  icon: () => '📄',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'RESUME',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'preloaderText',
      title: 'Preloader Text',
      type: 'string',
      initialValue: '{DEV.OBINNA.RESUME}',
    },
    {
      name: 'personalInfo',
      title: 'Personal Information',
      type: 'object',
      fields: [
        {
          name: 'fullName',
          title: 'Full Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'introduction',
          title: 'Introduction',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Professional summary/introduction paragraphs'
        },
      ]
    },
    {
      name: 'navigationSections',
      title: 'Navigation Sections',
      type: 'array',
      description: 'Sidebar navigation items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Section ID',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'Used for anchor links (e.g., "intro", "skills")'
            },
            {
              name: 'label',
              title: 'Navigation Label',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'Text displayed in sidebar navigation'
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: Rule => Rule.required().min(1)
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'id',
              description: 'order'
            },
            prepare(selection) {
              const { title, subtitle, description } = selection;
              return {
                title: title,
                subtitle: `#${subtitle}`,
                description: `Order: ${description}`
              };
            }
          }
        }
      ],
      initialValue: [
        { id: 'intro', label: 'Introduction', order: 1 },
        { id: 'skills', label: 'Skills', order: 2 },
        { id: 'employment', label: 'Employment History', order: 3 },
        { id: 'education', label: 'Education and Certifications', order: 4 }
      ]
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Skill Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'content',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'content'
            }
          }
        }
      ]
    },
    {
      name: 'employmentHistory',
      title: 'Employment History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'index',
              title: 'Time Period',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "2017 - 2020" or "2020 - Present"'
            },
            {
              name: 'label',
              title: 'Position and Company',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "Team Lead at DEF Corp"'
            },
            {
              name: 'content',
              title: 'Job Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H4', value: 'h4' }
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Number', value: 'number' }
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' }
                    ]
                  }
                }
              ],
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'index',
              description: 'content'
            }
          }
        }
      ]
    },
    {
      name: 'education',
      title: 'Education and Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'index',
              title: 'Time Period',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "2008 - 2012"'
            },
            {
              name: 'label',
              title: 'Degree and Institution',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "B.Sc. Computer Science, University of Lagos"'
            },
            {
              name: 'content',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.required(),
              description: 'Additional details about the education/certification'
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'index',
              description: 'content'
            }
          }
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isActive',
      title: 'Active Resume',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this resume'
    }
  ],
  
  preview: {
    select: {
      title: 'personalInfo.fullName',
      subtitle: 'title',
      media: 'profileImage'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Resume',
        subtitle: subtitle || 'RESUME'
      };
    }
  },

  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
}