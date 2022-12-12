import type { ReactElement, ReactNode } from 'react'
import { Button } from '@mui/material'
import useSafeInfo from '@/hooks/useSafeInfo'
import PagePlaceholder from '../PagePlaceholder'
import { AppRoutes } from '@/config/routes'
import Link from 'next/link'
import useWallet from '@/hooks/wallets/useWallet'
import { SANCTIONED_ADDRESS_MESSAGE } from '@/utils/ofac-sanctioned-addresses'

const SafeLoadingError = ({ children }: { children: ReactNode }): ReactElement => {
  const { safeError } = useSafeInfo()
  const wallet = useWallet()

  let walletError = ''
  if (wallet && wallet.sanctioned) {
    walletError = SANCTIONED_ADDRESS_MESSAGE
  }

  if (!safeError && !walletError) return <>{children}</>

  return (
    <PagePlaceholder
      img={<img src="/images/common/error.png" alt="A vault with a red icon in the bottom right corner" />}
      text={walletError || "This Safe couldn't be loaded"}
    >
      <Link href={AppRoutes.welcome} passHref>
        {walletError ? (
          <div />
        ) : (
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Go to the main page
          </Button>
        )}
      </Link>
    </PagePlaceholder>
  )
}

export default SafeLoadingError
