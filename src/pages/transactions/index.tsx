import HistoryPage from './history'
import type { GetServerSideProps } from 'next'
import { checkForForbiddenRegions } from '@/utils/geo'

export default HistoryPage

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
  return checkForForbiddenRegions(req, res) ?? { props: {} }
}
