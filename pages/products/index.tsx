import { PortableText } from '@portabletext/react'
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

const Products = ({ data }: { data: Products[] }) => {
  return (
    <div className="products">
        <h1 className='capitalize text-center mb-10'>products</h1>
      {data?.map(({ name, link, descriptionRaw, image }: Products, idx) => {
        const imageOrder = idx % 2 === 0 ? 'order-1' : 'order-2'
        const copyOrder = idx % 2 === 0 ? 'order-2' : 'order-1'
        const bgAndTextColor =
          idx % 2 === 0
            ? 'bg-tertiary text-white'
            : idx % 3 === 0
            ? 'bg-secondary text-white'
            : 'bg-primary'
        const buttonAndTextColor =
          idx % 2 === 0
            ? 'bg-secondary hover:bg-primary hover:text-tertiary'
            : idx % 3 === 0
            ? 'bg-tertiary hover:bg-primary hover:text-secondary'
            : 'bg-secondary hover:bg-tertiary'
        return (
          <div
            className={`${bgAndTextColor} products__section`}
            key={idx}
          >
            <div
              className={`${imageOrder} products__section--image`}
            >
              <Image
                src={image?.asset?.url}
                alt={`${name} image`}
                fill priority
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`${copyOrder} products__section--copyContainer`}
            >
              <div className="products__section--copy">
                <PortableText value={descriptionRaw} />
              </div>
              <div className='products__section--button'>
                <Link
                    href={link}
                    className={`${buttonAndTextColor} `}
                >
                    learn More
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const getStaticProps = async () => {
  const productQuery = `{
        allProducts{
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
  const getProuducts = await graphRequest(productQuery)
  const {
    data: { allProducts },
  } = await getProuducts
  return {
    props: {
      data: allProducts,
    },
  }
}

export default Products
