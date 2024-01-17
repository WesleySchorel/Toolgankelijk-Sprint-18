import { gql } from 'graphql-request';
import { hygraph } from '$lib/utils/hygraph.js';

import getQueryWebsite from '$lib/queries/website';
import getQueryDeleteUrl from '$lib/queries/deleteUrl';

export async function load({ params }) {
	const { websiteUID } = params;
	let query = getQueryWebsite(gql, websiteUID);

	return await hygraph.request(query).websitesData;
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		console.log(id);

		let query = getQueryDeleteUrl(gql, id);
		return await hygraph.request(query);

		// Process the form data and perform actions
		return { success: 'Verwijdert!' };
	}
};
