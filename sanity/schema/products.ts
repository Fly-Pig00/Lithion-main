import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

import slugify from "@/sanity/lib/slugify"
export const _featureSet = {
  name: '_featureSet',
  title: 'Set',
  type: 'object',
  fields: [
    {
      name: 'featureImage',
      title: 'Image',
      type: 'file',
    },
    {
      name: 'featureText',
      title: 'Description',
      type: 'text',
    },
  ],
}

export default {
  name: 'products',
  type: 'document',
  title: 'Products',
  ordeing: [orderRankOrdering],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 200, // Optional: set a maximum length for the slug
        slugify // Optional: specify a custom slugify function
      }
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'link to child company page to learn more',
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
    {
      name: 'image',
      title: 'Image',
      type: 'file',
    },
    orderRankField({type: 'products'})
  ],
}
