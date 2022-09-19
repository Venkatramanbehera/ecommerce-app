import { connect } from 'react-redux'
import { RootState } from '../../../store/store'
import Quotes from '../components/Quotes'
import { Quote } from '../service/quotes'

interface StateProps {
  quotes: Array<Quote>
  error: string
  loading: boolean
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    quotes: state.quotes.quotes,
    error: state.quotes.error,
    loading: state.quotes.loading,
  }
}

export const QuotesComponent = connect(mapStateToProps)(Quotes)
