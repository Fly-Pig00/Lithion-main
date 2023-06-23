import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client } from '../sanity/lib/client'

const SanityImage = ({ asset }) => {
  const imageProps: any = useNextSanityImage(client, asset)

  if (!imageProps) return null

  return (
    <div className="relative">
      <Image {...imageProps} alt={`${asset?._ref}`} priority/>
    </div>
  )
}

export default SanityImage
