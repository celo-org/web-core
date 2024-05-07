import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import NewSafe from '@/components/welcome/NewSafe'

import { checkForForbdidenRegions } from '@/utils/geo'

const Welcome: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Welcome'}</title>
      </Head>

      <NewSafe />
    </>
  )
}

export default Welcome

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  checkForForbdidenRegions(req, res)
  return { props: {} }
}
