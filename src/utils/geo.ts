import type { IncomingMessage, OutgoingMessage } from 'http'

export const HTTP_HEADER_COUNTRY = 'x-vercel-ip-country'
export const HTTP_HEADER_REGION = 'x-vercel-ip-country-region'

// korea, iran, cuba, syria
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
  const iso3166CountryUppercase = iso3166Country?.toUpperCase()
  return (
    RESTRICTED_COUNTRIES.has(iso3166CountryUppercase) ||
    RESTRICED_SUBREGION[iso3166CountryUppercase]?.has(iso3166Region)
  )
}

export function checkForForbiddenRegions(req: IncomingMessage, res: OutgoingMessage) {
  const coutry = req.headers[HTTP_HEADER_COUNTRY] as string
  const region = req.headers[HTTP_HEADER_REGION] as string

  console.info('country', coutry, 'region', region)

  if (isForbiddenLand(coutry, region)) {
    return { redirect: { destination: '/terms', permanent: false } }
  }
}
