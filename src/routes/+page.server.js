import { gql } from 'graphql-request'
import { hygraph } from '$lib/utils/hygraph.js'

import getQueryPartner from '$lib/queries/partner'
import getQueryAddPartner from '$lib/queries/addPartner'

export async function load() {
    let query = getQueryPartner(gql)
    
    return await hygraph.request(query)
}

// copy pasted server side to homepage
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
          message: 'Partner is toegevoegd, verwijzing naar homepage in een paar seconden.'
        }
      } catch (error) {
        
        return {
          message: 'Er ging wat mis, probeer het opnieuw.',
          success: false
        }
      }
    },
  };
