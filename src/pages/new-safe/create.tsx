import Head from 'next/head'
import type { NextPage, GetServerSideProps } from 'next'

import { checkForForbiddenRegions } from '@/utils/geo'

import CreateSafe from '@/components/new-safe/create'

const Open: NextPage = () => {
  return (
    <main>
      <Head>
        <title>{'Safe{Wallet} – Create Safe Account'}</title>
      </Head>

      <CreateSafe />
    </main>
  )
}

export default Open

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  return checkForForbiddenRegions(req, res) ?? { props: {} }
}
