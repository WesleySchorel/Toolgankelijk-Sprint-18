import { gql } from 'graphql-request'
import { hygraph } from '$lib/utils/hygraph.js'

import getQueryWebsite from '$lib/queries/website'
import getQueryAddUrl from '$lib/queries/addUrl'

export async function load({params}) {
    const { websiteUID } = params;
    let query = getQueryWebsite(gql, websiteUID)
    
    return await hygraph.request(query).websitesData
}

// the actions export is unique to sveltekit
export const actions = {  
  default: async ({ url, 
    request
  }) => {

    // get url partner value (slug)
    let partnerSlug = url.searchParams.get('partner')

    const formData = await request.formData();
    const name = formData.get('name')
    const formUrl = formData.get('url');

    console.log(name, formUrl, partnerSlug)

    try {
      let query = getQueryAddUrl(gql, name, formUrl, partnerSlug)
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