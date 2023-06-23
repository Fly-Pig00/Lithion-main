import Image from 'next/image';
import React from 'react'
import graphRequest from 'utils/graphql';

type AboutType = {
  descriptions: {
    title: string,
    copy: string,
    image?: {
      asset: {
        url: string
      }
    },
  }[],
  leadership: {
    name: string,
    title: string,
  }[]
}

const About = ({ about }: { about: AboutType }) => {
  return (
    <div className="about">
      {
        about?.descriptions?.map(({title, copy, image},idx) => {
          const imageOrder = idx % 2 === 0 ? 'order-1' : 'order-2'
          const copyOrder = idx % 2 === 0 ? 'order-2' : 'order-1'
          const bgAndTextColor =
            idx % 2 === 0
              ? 'bg-tertiary text-white'
              : idx % 3 === 0
              ? 'bg-secondary text-white'
              : 'bg-primary'
          return (
            <div key={title} className={`${bgAndTextColor} ${!image ?  'justify-center items-center h-[450px] flex w-full' : 'products__section'}`}>
              {
                image && 
                <div
                  className={`${imageOrder} products__section--image p-0`}
                >
                  <Image
                    src={image?.asset?.url}
                    alt={`${title} image`}
                    fill priority
                    className="w-full h-full object-cover"
                  />
                </div>
              }
              <div className={`${copyOrder} products__section--copyContainer`}>
                <h1 className={`${!image && "text-center"}`}>{title}</h1>
                <p className={`${!image && 'max-w-xl'}`}>{copy}</p>
              </div>
            </div>
          )
        })
      }
      <LeaderShip profiles={about.leadership}/>
    </div>
  )
}

const LeaderShip = ({profiles}) => {
  return (
    <div className="flex md:w-full lg:w-3/4 flex-wrap justify-center md:justify-between sm:mx-auto my-10">
      <h1 className='text-center text-tertiary'>Leadership</h1>
    {profiles?.map(({ name, position, image }) => {
      return (
        <div
          key={name}
          className="m-10 md:m-0 md:mb-10 lg:m-10"
        >
          <div className='relative w-64 h-64'>
            <Image
              src={image?.asset.url}
              alt={`${name} logo`}
              className="h-full w-full object-contain"
              fill
              priority
            />
          </div>
          <div className='flex flex-col space-y-2 text-center mt-5'>
            <h3 className='font-bold text-tertiary'>{name}</h3>
            <p>{position}</p>
          </div>
        </div>
      )
    })}
  </div>
  )
}

export const getStaticProps = async () => {
  const aboutQuery = `{
    allAbout{
      descriptions{
        title,
        copy,
        image{
          asset{
            url
          }
        }
      },
      leadership{
        name,
        position,
        image{
          asset{
            url
          }
        }
      }
    }
  }`;
  const getAbout = await graphRequest(aboutQuery);
  const {data:{allAbout}} = await getAbout;
  return {
    props: {
      about: allAbout[0]
    }
  }
}

export default About
