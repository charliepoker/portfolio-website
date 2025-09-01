// ./schemas/sayHello.js
export default {
  name: 'sayHello',
  title: 'Say Hello',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Small heading text, e.g., "Say Hello 👋"',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
  ],
}
