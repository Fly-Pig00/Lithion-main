import { PortableText } from '@portabletext/react'
import SanityImage from 'components/SanityImage'
import React from 'react'
import graphRequest from 'utils/graphql'

import { News } from '..'

const Articles = ({ articles }: { articles: News }) => {
  return (
    <div className="article page">
      <PortableText
        value={articles?.bodyRaw}
        components={{
          types: {
            image: ({ value }) => <SanityImage {...value} />,
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc">{children}</ul>
            ),
          },
        }}
      />
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const newsQuery = `{
    allArticles (where: {slug: {eq: "${params?.articles}"}}) {
      title,
      bodyRaw
    }
  }`
  const {data: { allArticles }} = await graphRequest(newsQuery)
  return {
    props: {
      articles: allArticles[0],
    },
  }
}

export const getStaticPaths = async () => {
  const articlesQuery = `{
    allArticles (where: {published :{eq: true}}) {
      title,
      slug,
    }
  }`
  const {
    data: { allArticles },
  } = await graphRequest(articlesQuery)
  const paths = await allArticles?.map(({ slug }) => {
    return { params: { articles: slug } }
  })
  return {
    paths,
    fallback: true,
  }
}

export default Articles
