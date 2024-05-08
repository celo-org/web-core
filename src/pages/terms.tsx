import type { NextPage } from 'next'
import Head from 'next/head'
import SafeTerms from '@/components/terms'
import ClabsTerms from '@/components/terms/clabs'
import { IS_OFFICIAL_HOST } from '@/config/constants'

const Imprint: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Terms'}</title>
      </Head>

      <main>{IS_OFFICIAL_HOST ? <SafeTerms /> : <ClabsTerms />}</main>
    </>
  )
}

export default Imprint
