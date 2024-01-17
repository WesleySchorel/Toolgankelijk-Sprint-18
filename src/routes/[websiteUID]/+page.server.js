import { gql } from 'graphql-request';
import { hygraph } from '$lib/utils/hygraph.js';

import getQueryWebsite from '$lib/queries/website';
import getQueryDeleteUrl from '$lib/queries/deleteUrl';
import getQueryUpdateUrl from '$lib/queries/updateUrl';

export async function load({ params }) {
	const { websiteUID } = params;
	let query = getQueryWebsite(gql, websiteUID);

	return await hygraph.request(query).websitesData;
}

export const actions = {
	deletePost: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		console.log(id);

		let query = getQueryDeleteUrl(gql, id);
		return await hygraph.request(query);
	},
	editPost: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const slug = formData.get('slug');
		const url = formData.get('url');

		console.log(id, slug, url);

		let query = getQueryUpdateUrl(gql, slug, url, id);
		return await hygraph.request(query);
	}
};
