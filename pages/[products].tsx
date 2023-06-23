import { PortableText } from '@portabletext/react'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PortableTextBlock } from 'sanity'
import graphRequest from 'utils/graphql'

type Products = {
  name: string
  link: string
  descriptionRaw: PortableTextBlock
  image: {
    asset: {
      url: string
    }
  }
}

const Products = ({ data }: { data: Products }) => {
  return (
    <>
      <h1 className='capitalize mb-10 bg-tertiary text-white h-40 flex items-center justify-center'>{data?.name}</h1>
      <div className="products page">
          <div className="relative w-full h-2/5 mb-10">
            <Image
              src={data?.image?.asset?.url}
              alt={`${data?.name} image`}
              fill priority
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full space-y-2">
            <PortableText value={data?.descriptionRaw} 
              components={{
                block: {
                  h3: ({children}) => <h3 className='font-bold'>{children}</h3>,
                  h6: ({children}) => <h6 className='font-bold'>{children}</h6>
                }
              }}
            />
          </div>
          <div className='products__section--button'>
            <Link
                href={data?.link}
                className="bg-tertiary hover:bg-secondary text-white"
            >
                learn More
            </Link>
          </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productQuery = `{ 
    allProducts{ 
      slug{
        current
      } 
    } 
  }`
  const {data: { allProducts }} = await graphRequest(productQuery)
  const paths = allProducts.map(({slug}) => ({ params: { products: slug.current }}))
  return {
    paths,
    fallback:false
  }
}

export const getStaticProps = async ({params}) => {
  const productQuery = `{
    allProducts(where: {slug: {current: {eq: "${params.products}"}}}){
      name,
      link,
      descriptionRaw,
      image{
        asset{
          url
        }
      }
    }
  }`
  const {
    data: { allProducts },
  } = await graphRequest(productQuery);
  return {
    props: {
      data: allProducts[0],
    },
  }
}

export default Products
