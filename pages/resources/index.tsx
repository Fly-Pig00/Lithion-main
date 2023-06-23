import SearchDownloads from 'components/SearchDownloads'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PortableTextBlock } from 'sanity'
import graphRequest from 'utils/graphql'

import { urlForImage } from '../../sanity/lib/image'

export type DownloadsType = {
  category: string
  files: {
    linkName: string
    link?: string
    file?: {
      asset: {
        url: string
      }
    }
  }[]
}

export type CaseStudies = {
  title: string
  slug: string
  bodyRaw: PortableTextBlock[]
}

type BrandsDownloads = {
  homegrid: DownloadsType[],
  gridbox: DownloadsType[],
  valence: DownloadsType[],
  aved: DownloadsType[],
  engineered: DownloadsType[],
  charger: DownloadsType[],
}

type BrandsCaseStudies = {
  homegrid: CaseStudies[],
  gridbox: CaseStudies[],
  valence: CaseStudies[],
  aved: CaseStudies[],
  engineered: CaseStudies[],
  charger: CaseStudies[],
}

const Resources = ({
  downloads,
  caseStudies,
}: {
  downloads: BrandsDownloads
  caseStudies: BrandsCaseStudies
}) => {
  const [brand, setBrand] = useState('homegrid');

  return (
    <div className="resources page py-20">
      <h1 className="border-none text-center font-light">Resources</h1>
      <DropDown select={setBrand}/>
      <Downloads data={downloads[brand]} />
      <CaseStudies data={caseStudies[brand]} />
    </div>
  )
}

const DropDown = ({select}) => {
  return (
    <select className="select w-full max-w-xs" onChange={v  => select(v.target.value)}>
      <option disabled>Filter By Brand</option>
      <option value="homegrid" selected>HomeGrid</option>
      <option value="gridbox">Gridbox</option>
      <option value="valence">Valence</option>
      <option value="aved">Aved</option>
      <option value="engineered">Engineered Power</option>
      <option value="charger">Charger Industries</option>
    </select>
  )
}

const Downloads = ({ data }) => {
  const [filteredList, setFilteredList] = useState([])
  useEffect(()=>{
    setFilteredList(data)
  },[data])
  return (
    <div className="downloads">
      <h2 className="border-b">Downloads</h2>
      <SearchDownloads original={data} setFiltered={setFilteredList} />
      <div className='downloads__container'>
        {filteredList.length === 0 ? (
          <h3 className="text-secondary">Sorry, no results found!</h3>
        ) : (
          filteredList.map((list, idx) => {
            return (
              <div key={idx} className="downloads__category">
                <h3 className='downloads__category--title'>{list?.category}</h3>
                {list?.files?.map(({ linkName, link, file }, idx: any) => {
                  return (
                    <Link
                      href={`${link ?? file?.asset.url}`}
                      className="downloads__link"
                      key={idx}
                      target="_blank"
                    >
                      {linkName}
                    </Link>
                  )
                })}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

const CaseStudies = ({ data }) => {
  return (
    <div className="caseStudies">
      <h2 className="border-b">Case Studies</h2>
      {
        data?.length > 0 ?
        <div className="caseStudies__thumbnail--container">
          {data?.map(({ title, slug, bodyRaw }, idx: number) => {
            const srcUrl = urlForImage(bodyRaw[0])?.url()
            const lithionLogo = '/lithion-logo-white.png'
            return (
              <Link
                className="caseStudies__thumbnail group"
                key={idx}
                href={`/resources/${slug}`}
              >
                <div className="caseStudies__thumbnail--image">
                  <Image
                    src={srcUrl ?? lithionLogo}
                    alt={srcUrl ?? lithionLogo}
                    className={`${
                      srcUrl ? 'object-cover' : 'object-contain px-5'
                    } opacity-90 hover:opacity-100`}
                    fill
                  />
                </div>
                <div className="flex items-end pt-5">
                  <p className="caseStudies__thumbnail--title">{title}</p>
                  <p className="caseStudies__thumbnail--action">read</p>
                </div>
              </Link>
            )
          })}
        </div>
        :
        <h3 className="text-secondary">No case studies available!</h3>
      }
    </div>
  )
}

export const getStaticProps = async () => {
  const brands = [
    "lithion",
    "homegrid",
    "gridbox",
    "valence",
    "aved",
    "engineered",
    "charger",
  ]
  const downloadsQuery = `{
    allDownloads (sort :{orderRank: ASC}) {
      category,
      files{
        linkName,
        link, 
        file{
          asset{
            url
          }
        }
      }
    }
  }`
  const caseStudiesQuery = `{
    allCaseStudies ( where: { published: { eq: true } } ){
      title,
      slug,
      bodyRaw
    }
  }`


  
  const getDownloads = async () => {
    const downloads = {};
    for(const brand of brands) {
      const {data:{allDownloads}} = await graphRequest(downloadsQuery, brand);
      downloads[brand] = await allDownloads;
    }
    return downloads;
  }
  
  const getCaseStudies = async () => {
    const caseStudies = {};
    for(const brand of brands) {
      const {data:{allCaseStudies}}= await graphRequest(caseStudiesQuery, brand)
      const thumbnails = await allCaseStudies.map((articles: CaseStudies) => {
        const newObj = { ...articles }
        const imageBlock = articles?.bodyRaw?.filter(
          (block) => block?._type === 'image'
        )
        newObj.bodyRaw = imageBlock;
        return newObj;
      })
      caseStudies[brand] = await thumbnails;
    }
    return caseStudies
  }

  return {
    props: {
      downloads: await getDownloads(),
      caseStudies: await getCaseStudies()
    },
    // revalidate: 60,
  }
}

export default Resources
