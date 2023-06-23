import { PortableText } from '@portabletext/react'
import SanityImage from 'components/SanityImage'
import React from 'react'
import { PortableTextBlock } from 'sanity'
import graphRequest from 'utils/graphql'

type Studies = {
  title: string
  bodyRaw: PortableTextBlock[]
}

const Studies = ({ studies }: { studies: Studies }) => {
  return (
    <div className="article page">
      {/* <h1>{studies?.title}</h1> */}
      <PortableText
        value={studies?.bodyRaw}
        components={{
          types: {
            image: ({ value }) => <SanityImage {...value} />,
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
          },
        }}
      />
    </div>
  )
}
export const getStaticProps = async ({
  params,
}: {
  params: { studies: string }
}) => {
  const query = `
  {
      allCaseStudies(where: {slug: {eq: "${params?.studies}"}}){
          title,
          bodyRaw
      }
  }`
  const {
    data: { allCaseStudies },
  } = await graphRequest(query)
  return {
    props: {
      studies: allCaseStudies[0],
    },
  }
}

export const getStaticPaths = async () => {
  const query = `{ allCaseStudies( where: { published: { eq: true } } ) { slug } }`
  const {
    data: { allCaseStudies },
  } = await graphRequest(query)
  const paths = allCaseStudies.map(({ slug }) => {
    return { params: { studies: slug } }
  })
  return {
    paths,
    fallback: false,
  }
}

export default Studies
