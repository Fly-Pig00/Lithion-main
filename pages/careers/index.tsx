import Link from 'next/link'
import React from 'react'
import graphRequest from 'utils/graphql'

type Positions = {
  position: string
  slug: string
  brand: string
}[]

const Careers = ({ positions }: { positions: Positions }) => {
  return (
    <div className="careers page">
      <h1 className="text-center">Open Positions</h1>
      <div className="careers__posts--container">
        {positions?.map(({ position, slug, brand }, idx) => {
          return (
            <Link
              key={idx}
              className="careers__position group"
              // Added '-${brand}' for dynamic page
              // to query from correct database in getStaticProps
              href={`/careers/${slug}-${brand}`}
            >
              <h3 className="group-hover:text-linkHover">{position}</h3>
              <p className="group-hover:text-tertiary">see full description</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const query = `
    {
      allCareers(where: {listed: {eq: true}}, sort:{_createdAt: ASC}){
        position,
        slug
      }
    }`
  const brands = [
    'lithion',
    'homegrid',
    'gridbox',
    'valence',
    'aved',
    'engineered',
    'charger',
  ]
  const positions = await Promise.all(
    brands.map(async (brand) => {
      const { data } = await graphRequest(query, brand)
      return data?.allCareers.map((career: { slug: string }) => ({
        ...career,
        brand,
      }))
    })
  ).then((results) => results.flat().filter((obj) => obj !== undefined))

  return {
    props: {
      positions,
    },
  }
}

export default Careers
