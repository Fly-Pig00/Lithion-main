import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SocialIcon } from 'react-social-icons'

import graphRequest from '../utils/graphql'

const Footer = () => {
  const date = new Date()
  const [socials, setSocials] = useState([])
  useEffect(() => {
    const getSocials = async () => {
      const query = `{
        allSocials{
          name,
          url,
        }
      }`
      const {data: {allSocials}} = await graphRequest(query)
      setSocials(allSocials);
    }
    getSocials()
  }, [])
  return (
    <footer>
      <div className="footer__container">
        <div className="mb-5 flex-1">
          <Link className="footer__logo" href="/">
            <Image
              fill
              src="/lithion-logo-white.png"
              alt="Lithion Logo"
              className="object-contain"
            />
          </Link>
          <div className="footer__socials">
            {socials?.map(({ name, url }, idx) => {
              return (
                <SocialIcon
                  key={idx}
                  network={name}
                  bgColor="black"
                  className="h-5 w-2"
                  style={{ width: 30, height: 30 }}
                  url={url}
                />
              )
            })}
          </div>
        </div>
        <div className="footer__links">
          <div className="mb-2 space-y-2 sm:mb-0">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/careers">Careers</Link>
          </div>
          <div className="space-y-2">
            <Link href="/resources">case studies</Link>
            <Link href="/resources">downloads</Link>
          </div>
        </div>
      </div>
      <p className="w-full bg-secondary py-3 px-8 text-left text-white sm:text-center">
        © {date.getFullYear()} Lithion Battery. all rights reserved
      </p>
    </footer>
  )
}

export default Footer
