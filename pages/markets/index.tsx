import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PortableTextBlock } from 'sanity'
import graphRequest from 'utils/graphql'

export type Markets = {
  title: string
  slug?: string
  image?: {
    asset: {
      url: string
    }
  }
  bgTone?: string
  copyAlignment?: string
  copy?: string
  bodyRaw?: PortableTextBlock
}

const Markets = ({ markets }: { markets: Markets[] }) => {
  return (
    <div className="markets">
      {markets?.map(
        ({ title, slug, image, copy, copyAlignment, bgTone }, idx: number) => {
          const alignCopy =
            copyAlignment === 'center'
              ? 'justify-center'
              : copyAlignment === 'right'
              ? 'justify-end sm:items-end'
              : 'justify-left sm:items-end'
          const btnColor =
            bgTone === 'light'
              ? 'bg-secondary hover:bg-tertiary'
              : bgTone === 'medium'
              ? 'bg-secondary hover:bg-white hover:text-secondary'
              : 'bg-tertiary hover:bg-white hover:text-tertiary'
          const textColor = bgTone === 'light' ? 'text-secondary' : 'text-white'
          return (
            <div
              key={idx}
              id={slug ?? title}
              className={`${alignCopy} relative flex min-h-[450px] w-full items-center`}
            >
              <div className="absolute z-0 h-full w-full">
                <Image
                  src={image?.asset?.url}
                  alt={`${title} image`}
                  fill
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className={`z-10 mx-10 flex h-max max-w-xl flex-col space-y-3 ${
                  copyAlignment === 'center' ? 'sm:mt-16' : 'sm:mb-14'
                }`}
              >
                <h1
                  className={`${textColor} ${
                    copyAlignment === 'center' && 'sm:text-center'
                  } font-bold`}
                >
                  {title}
                </h1>
                <p className={`${textColor} font-bold`}>{copy}</p>
                {slug && (
                  <div
                    className={`flex w-full ${
                      copyAlignment === 'center'
                        ? 'justify-end sm:justify-center'
                        : 'justify-end'
                    }`}
                  >
                    <Link
                      href={`/markets/${slug}`}
                      className={`${btnColor} w-max px-3 py-2 font-bold text-white `}
                    >
                      {' '}
                      Learn More
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

export const getStaticProps = async () => {
  const marketsQuery = `{
    allMarkets (sort:{ orderRank: ASC}){
      title,
      slug,
      image{
        asset{
          url
        }
      },
      bgTone,
      copyAlignment,
      copy
    }
  }` 
  const {data: { allMarkets }} = await graphRequest(marketsQuery)
  return {
    props: {
      markets: allMarkets,
    },
  }
}

export default Markets
