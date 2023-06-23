import { SchemaTypeDefinition } from 'sanity'

import about, { _descriptions, _leadership } from './schema/about'
import articles from './schema/articles'
import brands from './schema/brands'
import careers from './schema/careers'
import caseStudies from './schema/caseStudies'
import downloads, { _fileSet } from './schema/downloads'
import hero from './schema/hero'
import locations from './schema/locations'
import markets from './schema/markets'
import products, { _featureSet } from './schema/products'
import sections from './schema/sections'
import socials from './schema/socials'
import carousel from './schema/carousel'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    carousel,
    sections,
    about,
    _descriptions,
    _leadership,
    brands,
    markets,
    products,
    _featureSet,
    downloads,
    caseStudies,
    _fileSet,
    locations,
    careers,
    socials,
    articles,
  ],
}
