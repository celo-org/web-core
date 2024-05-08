import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import Dashboard from '@/components/dashboard'
import { checkForForbiddenRegions } from '@/utils/geo'

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

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  return checkForForbiddenRegions(req, res) ?? { props: {} }
}
