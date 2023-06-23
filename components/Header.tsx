import Image from 'next/image'
import Link from 'next/link'
import { Brands } from '@/pages/brands'
import React, { useEffect, useState } from 'react'
import graphRequest from 'utils/graphql'

import BrandNav from './BrandNav'
import SubMenu from './SubMenu'

export type Links = {
  title: string
  slug?: string
}[]

type Nav = {
  subMenuToggle?: string
  setSubMenuToggle?: Function
  marketsLinks?: Links,
  productsLinks?: Links,
  brands?: Brands[]
}

const Header = () => {
  const [subMenuToggle, setSubMenuToggle] = useState('')
  const [marketsLinks, setMarketsLinks] = useState([]);
  const [productsLinks, setProductsLinks] = useState([]);

  useEffect(() => {
    if (marketsLinks.length === 0) {
      const getMarketsLinks = async () => {
        const marketsQuery = `{
          allMarkets (sort: {orderRank: ASC}){
            title,
            slug,
          }
        }`
        const {data: { allMarkets }} = await graphRequest(marketsQuery)
        const fullSlugs = allMarkets.map(({title, slug}) => {
          return {title, slug: `markets/${slug}`}
        })        
        setMarketsLinks(fullSlugs)
      }
      getMarketsLinks()
    }
  }, [marketsLinks])

  useEffect(() => {
    if (productsLinks.length === 0) {
      const getproductsLinks = async () => {
        const productsQuery = `{
          allProducts (sort: {orderRank: ASC}){
            name, 
            slug{
              current
            }
          }
        }`
        const {data: { allProducts }} = await graphRequest(productsQuery)
        const allSlug = allProducts.map(({name, slug}) => {
          return {title: name, slug: `/${slug.current}`}
        })        
        setProductsLinks(allSlug)
      }
      getproductsLinks()
    }
  }, [productsLinks])

  return (
    <header>
      <DesktopNav
      subMenuToggle={subMenuToggle}
      setSubMenuToggle={setSubMenuToggle}
      marketsLinks={marketsLinks}
      productsLinks={productsLinks}
      />
      <MobileNav
      subMenuToggle={subMenuToggle}
      setSubMenuToggle={setSubMenuToggle}
      marketsLinks={marketsLinks}
      productsLinks={productsLinks}
      />
    </header>
  )
}

const DesktopNav = ({ subMenuToggle, setSubMenuToggle, marketsLinks, productsLinks }: Nav) => {
  return (
    <nav className="desktopNav">
      <Link className="headerLogo" href="/">
        <Image
          fill
          priority
          src="/lithion-logo-white.png"
          alt="Lithion Logo"
          style={{ objectFit: 'contain' }}
        />
      </Link>
      <ul>
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/brands">brands</Link>
        </li>
        {/* <li className="relative">
          <Link href="/products">Products</Link>
        </li> */}
        <li>
          <Link
            href="#" 
            onMouseOver={() => setSubMenuToggle('products')}
          >products
          </Link>
          {subMenuToggle === 'products' && (
            <SubMenu
              forPage="products"
              links={productsLinks}
              close={() => setSubMenuToggle('')}
            />
          )}
        </li>
        <li>
          <Link
            href="#" 
            onMouseOver={() => setSubMenuToggle('markets')}
            // onMouseOut={() => setSubMenuToggle('')}
          >markets
          </Link>
          {subMenuToggle === 'markets' && (
            <SubMenu
              forPage="markets"
              links={marketsLinks}
              close={() => setSubMenuToggle('')}
            />
          )}
        </li>
        <li>
          <Link href="/press">press</Link>
        </li>
        <li>
          <Link href="/resources">resources</Link>
        </li>
        <li>
          <Link href="/contact">contact</Link>
        </li>
      </ul>
    </nav>
  )
}

const MobileNav = ({ marketsLinks, productsLinks }: Nav) => {
  const [menu, setMenu] = useState(false)
  const NavLink = ({href} : {href: string}) => {
    return (
      <li>
        <Link href={href} onClick={() => setMenu(false)}>
          <h4>{href}</h4>
        </Link>
      </li>
    )
  }
  const NavCollapsible = ({ label, subLinks }: {label: string, subLinks: Links}) => {
    return (
      <li className="collapse -mt-5">
        <input type="checkbox" />
        <h4 className="collapse-title pl-0 capitalize">
          {label}
        </h4>
        <div className="collapse-content">
          {subLinks?.map(({ title, slug }) => (
            <Link
              key={title}
              href={slug}
              onClick={() => setMenu(false)}
            >
              {title}
            </Link>
          ))}
        </div>
      </li>
    )
  }
  return (
    <nav className="mobileNav">
      <BrandNav whiteLogo/>
      <Link className="headerLogo" href="/">
        <Image
          fill
          priority
          src="/lithion-logo-white.png"
          alt="Lithion Logo"
          className="object-contain"
        />
      </Link>
      <button className="absolute right-5 top-5" onClick={() => setMenu(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width={20}
          fill="#ffffff"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
      <ul className={menu ? 'block' : 'hidden'}>
        <button
          className="absolute top-5 right-5"
          onClick={() => setMenu(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width={16}
            fill="#ffffff"
          >
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>
        <NavLink href="about" />
        <NavLink href="brands" />
        <NavCollapsible label="products" subLinks={productsLinks}/>
        <NavCollapsible label="markets" subLinks={marketsLinks}/>
        <NavLink href="press" />
        <NavLink href="contact" />
      </ul>
    </nav>
  )
}

export default Header
