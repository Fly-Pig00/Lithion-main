import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PortableTextBlock } from 'sanity'
import graphRequest from 'utils/graphql'

import { urlForImage } from '@/sanity/lib/image'

export type News = {
  title: string
  slug?: string
  bodyRaw?: PortableTextBlock[]
}

const Press = ({ news }: { news: News[] }) => {
  return (
    <div className="press page">
      <h1 className="text-center">Press</h1>
      <div className="press__thumbnail--container ">
        {news?.map(({ title, slug, bodyRaw }, idx) => {
          const srcUrl = urlForImage(bodyRaw[0])?.url();
          const lithionLogo = '/lithion-logo-white.png'
          return (
            <Link
              key={idx}
              className="press__thumbnail group "
              href={`/press/${slug}`}
            >
              <div className="press__thumbnail--image">
                <Image
                  src={srcUrl ?? lithionLogo}
                  alt={srcUrl ?? lithionLogo}
                  className={`${
                    srcUrl ? 'object-cover' : 'object-contain px-5'
                  } opacity-90 hover:opacity-100`}
                  fill
                />
              </div>
              <div className="flex">
                <h4 className="press__thumbnail--title">{title}</h4>
                {/* <p className="group-hover:text-tertiary">Read</p> */}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const newsQuery = `{
    allArticles (where: {published :{eq: true}}) {
      title,
      slug,
      bodyRaw
    }
  }`
  const getNews = await graphRequest(newsQuery)
  const {
    data: { allArticles },
  } = await getNews
  const filteredForImageBlocks = allArticles.map((articles) => {
    const newObj = { ...articles }
    const imageBlock = articles?.bodyRaw?.filter(
      (block: any) => block?._type === 'image'
    )
    newObj.bodyRaw = imageBlock
    return newObj
  })
  return {
    props: {
      news: filteredForImageBlocks,
    },
  }
}

export default Press
