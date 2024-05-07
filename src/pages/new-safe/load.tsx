import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoadSafe, { loadSafeDefaultData } from '@/components/new-safe/load'
import { checkForForbdidenRegions } from '@/utils/geo'

const Load: NextPage = () => {
  const router = useRouter()
  const { address = '' } = router.query
  const safeAddress = Array.isArray(address) ? address[0] : address

  return (
    <main>
      <Head>
        <title>{'Safe{Wallet} – Add Safe Account'}</title>
      </Head>

      {safeAddress ? (
        <LoadSafe initialData={{ ...loadSafeDefaultData, address: safeAddress }} />
      ) : (
        <LoadSafe initialData={loadSafeDefaultData} />
      )}
    </main>
  )
}

export default Load

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  checkForForbdidenRegions(req, res)
  return { props: {} }
}
