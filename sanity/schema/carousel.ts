import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
export default {
    name: 'carousel',
    title: 'Carousel',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
      {
        name: 'title',
        title: 'Title',
        description: 'Title of this slide',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
        orderRankField({type: 'carousel'})
    ],
  }
  