import { gql } from 'graphql-request';
import { hygraph } from '$lib/utils/hygraph.js';

import getQueryDeletePartner from '$lib/queries/deletePartner';
import getQueryUpdatePartner from '$lib/queries/updatePartner';
import getQueryPartner from '$lib/queries/partner'
import getQueryAddPartner from '$lib/queries/addPartner'

export async function load() {
	let query = getQueryPartner(gql);
	return await hygraph.request(query);
}

// copy pasted server side to homepage
export const actions = {
    addPartner: async ({request}) => {
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
	deletePartner: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		console.log(id);

		let query = getQueryDeletePartner(gql, id);
		return await hygraph.request(query);
	},
	editPartner: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const slug = formData.get('slug');
		const url = formData.get('url');

		console.log(id, name, slug, url);

		let query = getQueryUpdatePartner(gql, name, slug, url, id);
		return await hygraph.request(query);
	},
  };
