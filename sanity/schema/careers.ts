export default {
  name: 'careers',
  type: 'document',
  title: 'Careers',
  fields: [
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
    },
    {
      name: 'listed',
      title: 'Listed',
      type: 'boolean',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
      ],
    },
  ],
}
