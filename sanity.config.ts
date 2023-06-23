/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

export default defineConfig({
  name: 'lithionStudio',
  title: 'Lithion Content Manager',
  basePath: '/studio',
  projectId,
  dataset,
  //edit schemas in './sanity/schema'
  schema,
  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({ type: 'sections', S, context }),
            orderableDocumentListDeskItem({ type: 'brands', S, context }),
            orderableDocumentListDeskItem({ type: 'markets', S, context }),
            orderableDocumentListDeskItem({ type: 'products', S, context }),
            orderableDocumentListDeskItem({ type: 'downloads', S, context }),
            orderableDocumentListDeskItem({ type: 'carousel', S, context }),
            ...S.documentTypeListItems(),

            // // Optional configuration
            // orderableDocumentListDeskItem({
            //     type: 'project',
            //     title: 'Projects',
            //     icon: Paint,
            //     // Required if using multiple lists of the same 'type'
            //     id: 'orderable-en-projects',
            //     // See notes on adding a `filter` below
            //     filter: `__i18n_lang == $lang`,
            //     params: {
            //         lang: 'en_US'
            //     },
            //     // pass from the structure callback params above
            //     S,
            //     context
            // }),
          ])
      },
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
