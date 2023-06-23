import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
export default {
  name: 'markets',
  title: 'Markets',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'markets' }),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'url of market article'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'file',
      description: 'Thumbnail image for markets page'
    },
    {
      name: 'bgTone',
      title: 'Thumbnail Image Tone',
      type: 'string',
      description: 'Affects button and text color',
      options: {
        list: [
          'dark',
          'medium',
          'light',
        ],
      }
    },
    {
      name: 'copyAlignment',
      title: 'Copy Alignment',
      type: 'string',
      description: 'Alignment of copy',
      options: {
        list: [
          'left',
          'center',
          'right'
        ],
      }
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'text',
      description: 'Brief description of market category'
    },
    {
      name: 'body',
      title: 'body',
      description: 'Individual article about the market Lithion is in. ',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
        {type: 'image'}
      ]
    },
  ],
}
