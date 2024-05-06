import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import Dashboard from '@/components/dashboard'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Dashboard'}</title>
      </Head>

      <main>
        <Dashboard />
      </main>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{}> = async ({ req }) => {
  const country = req.headers['x-vercel-ip-country'] as string
  const region = req.headers['x-vercel-ip-country-region'] as string

  if (isForbiddenLand(country, region)) {
    return {
      notFound: true,
    }
  }
  return { props: {} }
}

const RESTRICTED_COUNTRIES = new Set(['KP', 'IR', 'CU', 'SY'])

// https://www.iso.org/obp/ui/#iso:code:3166:UA although listed with UA prefix. the header/api recieved that and just used the number
const crimea = '43'
const luhansk = '09'
const donetska = '14'
//https://en.wikipedia.org/wiki/Russian-occupied_territories_of_Ukraine
const RESTRICED_SUBREGION: Record<string, Set<string>> = {
  UA: new Set([crimea, luhansk, donetska]),
}

export function isForbiddenLand(iso3166Country: string, iso3166Region: string) {
  const iso3166CountryUppercase = iso3166Country.toUpperCase()
  return (
    RESTRICTED_COUNTRIES.has(iso3166CountryUppercase) ||
    RESTRICED_SUBREGION[iso3166CountryUppercase]?.has(iso3166Region)
  )
}
