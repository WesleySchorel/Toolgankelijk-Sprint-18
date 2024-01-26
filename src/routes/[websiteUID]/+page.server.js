import { gql } from 'graphql-request';
import { hygraph } from '$lib/utils/hygraph.js';

import getQueryAddUrl from '$lib/queries/addUrl';
import getQueryWebsite from '$lib/queries/website';
import getQueryDeleteUrl from '$lib/queries/deleteUrl';
import getQueryUpdateUrl from '$lib/queries/updateUrl';

export async function load({ params }) {
	const { websiteUID } = params;
	let query = getQueryWebsite(gql, websiteUID);

	return await hygraph.request(query).websitesData;
}

// the actions export is unique to sveltekit
export const actions = {
	deletePost: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// console.log(id);

		let query = getQueryDeleteUrl(gql, id);
		return await hygraph.request(query);
	},
	editPost: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const slug = formData.get('slug');
		const url = formData.get('url');

		// console.log(id, slug, url);

		let query = getQueryUpdateUrl(gql, slug, url, id);
		return await hygraph.request(query);
	},

	addUrl: async ({ url, request }) => {
		// get url partner value (slug)
		let partnerSlug = url.searchParams.get('partner');

		const formData = await request.formData();
		const name = formData.get('name').toLowerCase();
		const formUrl = formData.get('url');
		const formSlug = formData.get('slug');

		// console.log(formSlug)

		try {
			let query = getQueryAddUrl(gql, name, formUrl, formSlug);
			let hygraphCall = await hygraph.request(query);

			return {
				hygraphCall,
				success: true,
				message: name + ' is toegevoegd.'
			};
		} catch (error) {
			return {
				message: 'Er ging wat mis, probeer het opnieuw.',
				success: false
			};
		}
	}
};
