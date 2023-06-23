import { PortableText } from '@portabletext/react'
import SanityImage from 'components/SanityImage'
import React from 'react'
import graphRequest from 'utils/graphql'

import { Markets } from '..'

const Article = ({article}:{article: Markets}) => {
  return (
    <div className="article page">
    <PortableText
      value={article?.bodyRaw}
      components={{
        types: {
          image: ({ value }) => <SanityImage {...value} />,
        },
        list: {
          bullet: ({ children }) => (
            <ul className="list-disc pl-4">{children}</ul>
          ),
        },
      }}
    />
  </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const articleQuery = `{
    allMarkets (where: {slug: {eq: "${params?.article}"}}) {
      title,
      bodyRaw
    }
  }`
  const {data: { allMarkets }} = await graphRequest(articleQuery);
  return {
    props: {
      article: allMarkets[0],
    },
  }
}

export const getStaticPaths = async () => {
  const marketsQuery = `{
    allMarkets { slug }
  }`
  const {data: {allMarkets}} = await graphRequest(marketsQuery);
  const paths = await allMarkets?.map(({ slug }) => ({ params: { article: slug } }))
  return {
    paths,
    fallback: true,
  }
}
export default Article