import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"
export default {
  name: 'brands',
  title: 'Brands',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'link to external site',
    },
    {
      name: 'regularLogo',
      title: 'Regular Logo',
      type: 'image',
    },
    {
      name: 'whiteLogo',
      title: 'White Logo',
      type: 'image',
    },
    orderRankField({type: 'brands'})
  ],
}
