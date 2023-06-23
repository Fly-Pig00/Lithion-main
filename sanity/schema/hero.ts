export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    },
    {
      name: 'sloganLine2',
      title: 'Slogan Line 2',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'live',
      title: 'Live',
      type: 'boolean',
      validation: (rule) => rule.required(),
    },
  ],
}
