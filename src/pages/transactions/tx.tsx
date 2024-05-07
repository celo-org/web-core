import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'

import SingleTx from '@/components/transactions/SingleTx'
import Typography from '@mui/material/Typography'
import { checkForForbdidenRegions } from '@/utils/geo'

const SingleTransaction: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Transaction details'}</title>
      </Head>

      <main>
        <Typography variant="h3" fontWeight={700} pt={1} mb={3}>
          Transaction details
        </Typography>

        <SingleTx />
      </main>
    </>
  )
}

export default SingleTransaction

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  checkForForbdidenRegions(req, res)
  return { props: {} }
}
