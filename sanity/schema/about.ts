export const _descriptions = {
  name: '_descriptions',
  title: 'Descriptions',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'file',
    },
  ],
}

export const _leadership = {
  name: '_leadership',
  title: 'Leadership',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'file',
    },
  ],
}

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'version',
      title: 'Version',
      description: 'Name of this version of about page data',
      type: 'string',
    },
    {
      name: 'descriptions',
      title: 'Descriptions',
      type: 'array',
      of: [{ type: '_descriptions' }],
    },
    {
      name: 'leadership',
      title: 'Leadership',
      type: 'array',
      of: [{ type: '_leadership' }],
    },
  ],
}
