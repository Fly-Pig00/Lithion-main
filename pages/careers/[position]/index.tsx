import { PortableText } from '@portabletext/react'
import ApplicationForm from 'components/ApplicationForm'
import AvedAppForm from 'components/AvedAppForm'
import React from 'react'
import { PortableTextBlock } from 'sanity'
import graphRequest from 'utils/graphql'

type Career = {
  position: string
  descriptionRaw: PortableTextBlock[]
  brand?: string
}

const Position = ({ career }: { career: Career }) => {
  return (
    <div className="careers__position--page page">
      <h1>{career?.position}</h1>
      <PortableText
        value={career?.descriptionRaw}
        components={{
          list: {
            bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
          },
        }}
      />
      <h2>Application</h2>
      {career?.brand ? (
        <AvedAppForm position={career?.position} />
      ) : (
        <ApplicationForm position={career?.position} />
      )}
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `{ allCareers( where: { listed: { eq: true } } ) { slug } }`
  const brands = [
    'lithion',
    'homegrid',
    'gridbox',
    'valence',
    'aved',
    'engineered',
    'charger',
  ]
  const allCareers = await Promise.all(
    brands.map(async (brand) => {
      const { data } = await graphRequest(query, brand)
      return data?.allCareers.map((career: { slug: string }) => ({
        ...career,
        brand,
      }))
    })
  ).then((results) => results.flat().filter((career) => career !== undefined))
  const paths = allCareers.map(({ slug, brand }) => {
    // Added brand at the end to match href from parent route Link component
    return { params: { position: `${slug}-${brand}` } }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { position: String }
}) => {
  const lastHyphenIndex = params?.position.lastIndexOf('-')
  const slug = params?.position.substring(0, lastHyphenIndex)
  const brand = params?.position.substring(lastHyphenIndex + 1)
  const careersQuery = `
  {
    allCareers(where: {slug: {eq: "${slug}"}}){
      position,
      descriptionRaw
    }
  }`
  const {
    data: { allCareers },
  } = await graphRequest(careersQuery, brand)

  return {
    props: {
      career: brand === 'aved' ? { ...allCareers[0], brand } : allCareers[0],
    },
  }
}

export default Position
