export const _hero = {
  name: '_hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    },
    {
      name: 'slogan2',
      title: 'Slogan2',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'file',
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

export const _sections = {
  name: '_sections',
  title: 'Sections',
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
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Links to external or internal pages',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'file',
    },
  ],
}

export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'version',
      title: 'Version',
      description: 'Name of this version of home page data',
      type: 'string',
    },
    {
      name: 'hero',
      title: 'Hero',
      type: 'array',
      of: [{ type: '_hero' }],
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{ type: '_sections' }],
    },
  ],
}
