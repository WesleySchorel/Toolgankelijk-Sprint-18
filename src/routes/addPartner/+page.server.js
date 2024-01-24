import {
  gql
} from 'graphql-request'
import {
  hygraph
} from '$lib/utils/hygraph.js'

import getQueryAddPartner from '$lib/queries/addPartner'

// the actions export is unique to sveltekit
export const actions = {
  default: async ({
    request
  }) => {

    const formData = await request.formData();
    const name = formData.get('name')
    const url = formData.get('url');
    // slugs moeten lowercase sinds het uniek is
    const slug = name.toLowerCase()

    try {
      let query = getQueryAddPartner(gql, name, url, slug)
      let hygraphCall = await hygraph.request(query)

      return {
        hygraphCall,
        success: true,
        message: name + ' is toegevoegd.'
      }
    } catch (error) {

      return {
        message: 'Er ging wat mis, probeer het opnieuw.',
        success: false
      }
    }
  },
};