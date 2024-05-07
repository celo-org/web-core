import HistoryPage from './history'
import type { GetServerSideProps } from 'next'
import { checkForForbdidenRegions } from '@/utils/geo'

export default HistoryPage

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  checkForForbdidenRegions(req, res)
  return { props: {} }
}
