import { useEffect } from 'react'
import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Box, CircularProgress } from '@mui/material'
import { useSafeAppUrl } from '@/hooks/safe-apps/useSafeAppUrl'
import { useChainFromQueryParams } from '@/hooks/safe-apps/useChainFromQueryParams'
import { SafeAppLanding } from '@/components/safe-apps/SafeAppLandingPage'
import { AppRoutes } from '@/config/routes'
import { checkForForbdidenRegions } from '@/utils/geo'

const ShareSafeApp = () => {
  const router = useRouter()
  const appUrl = useSafeAppUrl()
  const { chain, validChain, loading: chainLoading, error: chainError } = useChainFromQueryParams()

  useEffect(() => {
    if (chainLoading) return

    if (router.isReady && (!appUrl || !validChain || !chain)) {
      router.push(AppRoutes.index)
    }
  }, [appUrl, validChain, chain, chainLoading, router])

  if (chainLoading) {
    return (
      <Box py={4} textAlign="center">
        <CircularProgress size={40} />
      </Box>
    )
  }

  if (!appUrl || !validChain || !chain) {
    return null
  }

  if (chainError) {
    throw new Error(chainError)
  }

  return (
    <>
      <Head>
        <title>Safe Apps – Share</title>
      </Head>

      <main>
        <SafeAppLanding appUrl={appUrl} chain={chain} />
      </main>
    </>
  )
}

export default ShareSafeApp

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  checkForForbdidenRegions(req, res)
  return { props: {} }
}
