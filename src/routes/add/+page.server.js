import {
    gql
} from 'graphql-request'
import {
    hygraph
} from '$lib/utils/hygraph.js'

import getQueryAddPartner from '$lib/queries/addPartner'

// the actions export is unique to sveltekit
export const actions = {
    default: async ({ request }) => {
      const formData = await request.formData();
      const name = formData.get('name')
      const url = formData.get('url');
      
      console.log(name, url)

      let query = getQueryAddPartner(gql, name, url)
      return await hygraph.request(query)
      
      // Process the form data and perform actions
      return { success: "gepost!" };
    },
  };