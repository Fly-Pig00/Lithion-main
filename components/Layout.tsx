import { Roboto } from '@next/font/google'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'

import Footer from './Footer'
import Header from './Header'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic' ],
  subsets: ['latin']
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  const googleAnalyticsID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <div className={roboto.className}>
      <Head>
        <title>Lithion Battery - Powering Innovation</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="Lithion Battery" content="Lithion Battery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main >{children}</main>
      <Footer />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`}
      />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsID}', {
            page_path: window.location.pathname,
            });
            `,
        }}
      />
      {/* <Script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"/> */}
    </div>
  )
}

export default Layout
