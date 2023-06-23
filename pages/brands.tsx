import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import graphRequest from 'utils/graphql'

export type Brands = {
  name: string
  link: string
  regularLogo: {
    asset: {
      url: string,
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  whiteLogo: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
}

const Brands = ({ brands } : {brands : Brands[]}) => {
  return (
    <div className="brands page">
      <h1 className="text-center">Brands</h1>
      <div className=" w-full grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands?.map(({ name, link, regularLogo }) => {
          return (
            <div
              key={name}
              className=" rounded border border-tertiary p-10 ring-tertiary hover:ring-1 flex justify-center"
            >
              <Link href={link} className="relative h-[200px] w-[200px]">
                <Image
                  src={regularLogo?.asset.url}
                  alt={`${name} logo`}
                  className="h-full w-full object-contain"
                  fill
                  priority
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const query = `{
    allBrands (sort: {orderRank: ASC}){
      name,
      link,
      regularLogo{
        asset{
          url
        }
      }
    }
  }`
  const {
    data: { allBrands },
  } = await graphRequest(query)
  return {
    props: {
      brands: allBrands.filter((brand: Brands) => brand.name !== 'Lithion'),
    },
  }
}

export default Brands
