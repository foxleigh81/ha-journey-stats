// Import dependencies
import gql from 'graphql-tag'

// GraphQL Query
const allTerms = gql `
  query allTerms {
    allTerms {
      id
      type
      shortTerm
      longTerm
      definition
    }
  }
`

export default {
    name: 'GraphQlExample',
    data: () => ({
        loading: 0,
        allTerms: [],
    }),
    apollo: {
        $loadingKey: 'loading',
        allTerms: {
            query: allTerms
        }
    }
}