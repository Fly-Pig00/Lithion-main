import Link from 'next/link'
import React from 'react'

import { Links } from './Header'

type subMenu = {
  forPage: String
  links: Links
  close: Function
}

const SubMenu = ({ forPage, links, close }: subMenu) => {
  return (
    <div id={`${forPage}`} className="subMenu" onMouseLeave={() => close()}>
      <ul>
        {links?.map(({ title, slug,}, idx: number) => {
          return (
            <li key={idx}>
              <Link href={`/${slug}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SubMenu
