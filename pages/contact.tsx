import ContactForm from 'components/ContactForm'
import React from 'react'
import graphRequest from 'utils/graphql'

type Locations = {
  city: string,
  country: string,
  company: string,
  address: string
}

const Contact = ({locations} : {locations: object}) => {
  return (
    <div className="contact page">
      <h1 id="general">General Inquiries</h1>
      <ContactForm />
      <h1 className='text-left'>Locations</h1>
      <LocationsComponent locations={locations}/>
    </div>
  )
}

const LocationsComponent = ({locations} : {locations: object}) => {
  const regions = Object.keys(locations);
  return (
    <div className='locations'>
      {
        regions?.map((region, index) => {
          return (
            <div key={index}>
              <h2 className='locations__region'>{region}</h2>
              <div className='locations__row'>
                { 
                  locations[region]?.map(({city, company, address} : Locations, idx: number) => {
                    return(
                      <div key={idx} className="locations__place">
                        <h4 className='locations__city'>{city}</h4>
                        <p className='locations__company'>{company}</p>
                        <p className='locations__address'>{address}</p>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export const getStaticProps = async () => {
  const locationsQuery = `{
    allLocations {
      city,
      country,
      company,
      address
    }
  }`
  const getLocations = await graphRequest(locationsQuery);
  const {data: {allLocations}} = await getLocations;
  const byRegion = allLocations.reduce((acc: Locations, curr: Locations ) => {
    const objKeys = Object.keys(acc);
    if(objKeys.includes(curr.country)) {
      acc[curr.country].push(curr);
    } else {
      acc[curr.country] = [{...curr}]
    }
    return acc
  },{});
  
  return {
    props: {
      locations: byRegion
    }
  }
}

export default Contact
