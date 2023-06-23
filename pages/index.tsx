import Image from 'next/image'
import Link from 'next/link'

import graphRequest from '../utils/graphql'
import { Brands } from './brands'
import Flickity from 'react-flickity-component'
import { useRef, forwardRef } from 'react';


type HomeType = {
  hero: HeroType
  carousel: Carousel[]
  sections: Section[]
  brands: Brands[]
}

type Carousel = {
  title: string,
  image: {
    asset: {
      url: string
    }
  }
}

type HeroType = {
  slogan?: string
  sloganLine2?: string
  image?: {
    asset: {
      url: string
    }
  }
  link?: string,
}

type Section = {
  title: string
  copy?: string
  link?: string
  image?: {
    asset: {
      url: string
    }
  }
}

type Refs = {
  current: {
    title: Flickity | null
    image: Flickity | null
  }
}


// Import flickity-fade
typeof window !== "undefined"
  ? require("flickity-fade")
  : () => null


const Home = ({ hero, carousel, sections, brands }: HomeType) => {
  const flickityRefs = useRef({title: null, image: null})

  const options =  {
    draggable: false,
    fade: true,
  }

  return (
    <div className="home">
      <div className="home__hero">
        <h2 className='relative z-40 text-center text-white'>The electrification of</h2>
        <div className='w-screen z-40 relative'>
          <Flickity
            flickityRef={v => flickityRefs.current.title = v}
            options = {options}
            reloadOnUpdate={true}
            >
            {
              carousel?.map(({title}) => <h1 key={title} className='w-full text-center text-white font-bold tracking-wider'>{title}</h1>)
            }
          </Flickity>
        </div>
        <BrandBanner brands={brands} ref={flickityRefs}/>
        <div className='absolute top-0 left-0 w-screen overflow-hidden z-0'>
          <Flickity
            options={options}
            reloadOnUpdate={true}
            flickityRef={v => flickityRefs.current.image = v}
          >
            {
              carousel?.map(({title,image}) => {
                return(
                  <div className="relative h-screen w-screen" key={title}>
                    <Image
                      priority
                      fill
                      src={`${image?.asset.url}`}
                      alt="lithion hero image"
                      className="object-cover z-0"
                    />
                  </div>
                )
              })
            }
          </Flickity>
        </div>
       
      </div>
      {sections?.map((section, idx) => {
        return <Sections key={idx} index={idx} data={section} />
      })}
    </div>
  )
}
const Hero = ({
  data: { slogan, sloganLine2, image, link },
  brands
}: {
  data: HeroType,
  brands?: Brands[]
}) => {
  // CAROUSEL HERE
  return (
    <div className="home__hero">
      {image && (
        <div className="home__hero--image relative ">
          <Image
            priority
            fill
            src={`${image?.asset.url}`}
            alt="lithion hero image"
            className="object-cover"
          />
        </div>
      )}
      <div>
        <h3 className="home__hero--slogan">{slogan}</h3>
        <h1 className="home__hero--slogan font-bold">{sloganLine2}</h1>
      </div>
      <BrandBanner brands={brands} />
      {/* <Link className='hero__image' href={link}>link</Link> */}
    </div>
  )
}


const BrandBanner = forwardRef((props: {brands: Brands[]}, ref: Refs) => {
  const {brands} = props;
  return (
    <div className="brandBanner">
      {/* <div className="brandBanner__gradient" /> */}
      <div className="brandBanner__container">
        {brands?.map(({ name, link, whiteLogo }, idx) => {
          const {
            asset: {
              metadata: {
                dimensions: { height, width },
              },
            },
          } = whiteLogo
          return (
            <Link
              key={idx}
              href={link}
              className={`brandBanner__logos ${name === 'Aved' || name === 'Charger Industries' ?'max-w-[120px]': 'max-w-[200px]'}`}
              target={'blank'}
              onMouseEnter={() => {
                ref.current.title.select(idx+1)
                ref.current.image.select(idx+1)
              }}
              onMouseLeave={() => {
                ref.current.title.select(0)
                ref.current.image.select(0)
              }}
            >
              <Image
                src={whiteLogo?.asset?.url}
                alt={`${name} Logo`}
                width={width}
                height={height}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
})

BrandBanner.displayName = "BrandBanner"

const Sections = ({ data, index }) => {
  const background =
    data?.image && index % 2 === 0
      ? 'bg-tertiary'
      : data?.image && index % 2 !== 0
      ? 'bg-primary'
      : 'bg-secondary'
  const textColor = index % 2 === 0 ? 'text-white' : 'text-tertiary'
  const imageOrder = index % 2 === 0 ? 'sm:order-1 order-2' : 'order-2'
  const copyOrder = index % 2 === 0 ? 'sm:order-2 order-1' : 'order-1'
  const copyAlignment = data?.image ? 'items-left' : 'items-center'
  const sectionHeight = data?.image ? 'h-[640px]' : 'h-[320px]'

  return (
    <div
      className={`home__sections ${background} ${textColor} ${sectionHeight}`}
    >
      {data?.image && (
        <div className={`home__sections--image ${imageOrder}`}>
          <Image
            priority
            fill
            src={`${data?.image.asset.url}`}
            alt="lithion hero image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className={`home__sections--copy ${copyOrder}`}>
        <div className={copyAlignment}>
          <h3>{data?.title}</h3>
          <p>{data?.copy}</p>
          {data?.link && (
            <Link href={`${data?.link}`} className="home__sections--link">
              Learn More
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const heroQuery = `{
      allHero(where:{ live: { eq: true } }){
        slogan,
        sloganLine2,
        link,
        image{
          asset{
            url
          }
        }
      }
    }`
  const carouselQuery = `{
      allCarousel(sort: {orderRank: ASC}){
       title,
       image{
        asset{
          url
        }
       }
      }
    }`
  const sectionsQuery = `{
      allSections(
        where:{ live: { eq: true } },
        sort:{ orderRank: ASC}
      ){
        title,
        copy,
        link,
        image{
          asset{
            url
          }
        }
      }
    }`
  const brandsQuery = `{
      allBrands (sort: {orderRank: ASC}){
        name,
        link,
        whiteLogo{
          asset{
            url,
            metadata{
              dimensions{
                width,
                height
              }
            }
          }
        }
      }
    }`
  const {
    data: { allHero },
  } = await graphRequest(heroQuery)
  const {
    data: { allCarousel },
  } = await graphRequest(carouselQuery)
  const {
    data: { allSections },
  } = await graphRequest(sectionsQuery)
  const {
    data: { allBrands },
  } = await graphRequest(brandsQuery)
  return {
    props: {
      hero: allHero[0],
      carousel: allCarousel,
      sections: allSections,
      brands: allBrands.filter((brand: Brands) => brand.name !== 'Lithion'),
    },
  }
}

export default Home
