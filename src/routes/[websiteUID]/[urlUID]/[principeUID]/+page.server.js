// import { Actions } from '@sveltejs/kit';
import { gql } from 'graphql-request';
import { hygraph } from '$lib/utils/hygraph.js';

import getQueryUrl from '$lib/queries/url';
import getQueryToolboard from '$lib/queries/toolboard';
import firstCheck from '$lib/queries/firstCheck';
import addCheck from '$lib/queries/addCheck';
import deleteCheck from '$lib/queries/deleteCheck';

import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	console.log('loading...')
	const { websiteUID } = params;
	const { urlUID } = params;
	const { principeUID } = params;
	const slugUrl = urlUID;
	const principeSlug = principeUID;
	const queryUrl = getQueryUrl(gql, urlUID);
	const queryToolboard = getQueryToolboard(gql, slugUrl, principeSlug);
	const urlData = await hygraph.request(queryUrl);
	const toolboardData = await hygraph.request(queryToolboard);

	if (urlData.url.website.slug === websiteUID) {
		// Your existing condition
		if (toolboardData.principe === null) {
			throw error(404, {
				message: 'Principe bestaat niet'
			});
		}
		return {
			toolboardData,
			urlData
		};
	}
	throw error(404, {
		message: 'Not found'
	});
};

export const actions = {
	updateChecklist: async ({ request, params }) => {
		const formData = await request.formData();
		const clientCheckedSuccesscriteria = formData.getAll('check');
		const principeIndex = formData.get('principe');
		const niveau = formData.get('niveau');

		// see of the sent checks are already assigned to this project's checks
		const { websiteUID, urlUID, principeUID } = params;
		const slugUrl = urlUID;
		const principeSlug = principeUID;
		const queryToolboard = getQueryToolboard(gql, slugUrl, principeSlug);
		const toolboardData = await hygraph.request(queryToolboard);

		// get only the succescriteria from the db which have the current principeIndex and niveau of the submitted form
		const savedCheckedSuccescriteria = toolboardData.url.checks[0]
			? toolboardData.url.checks[0].succescriteria.filter((obj) => {
					return obj.niveau == niveau && obj.index[0] == principeIndex;
			  })
			: [];

		if (clientCheckedSuccesscriteria.length > 0) {
			for (const clientCheckedSuccesscriterium of clientCheckedSuccesscriteria) {
				// is the form input selected AND saved to the db
				if (savedCheckedSuccescriteria.find((obj) => obj.id === clientCheckedSuccesscriterium)) {
					console.log(clientCheckedSuccesscriterium + ' is already true');
				} else {
					// the input is selected but cannot be found in the db, so it will be added
					console.log(clientCheckedSuccesscriterium + ' is being added...');
					await addCheckToList(clientCheckedSuccesscriterium);
				}
			}

			for (const savedCheckedSuccescriterium of savedCheckedSuccescriteria) {
				// the saved check found in the db, is not selected in the form by the client
				// so it should be disconnected from the db
				if (!clientCheckedSuccesscriteria.find((obj) => obj === savedCheckedSuccescriterium.id)) {
					console.log(savedCheckedSuccescriterium.id + ' is being removed...');
					await deleteCheckFromList(savedCheckedSuccescriterium.id);
				}
			}
		} else {
			// there are none checked inputs AND none are in the db connected
			if (savedCheckedSuccescriteria == 0) {
				console.log('all checks were already false');
			} else {
				console.log('all checks are being removed...');
				// in case there is one or more checks in the db AND none are checked by the client
				// disconnect these from the db
				for (const savedCheckedSuccescriterium of savedCheckedSuccescriteria) {
					await deleteCheckFromList(savedCheckedSuccescriterium.id);
				}
			}
		}
		console.log('===================');
		// console.log(websiteUID, urlUID)

		async function addCheckToList(succescriteriumId) {
			try {
				let getFirstCheckId = (await getFirstCheck()).firstCheckId;

				let addCheckQuery = addCheck(gql, websiteUID, urlUID, getFirstCheckId, succescriteriumId);
				let addCheckId = await hygraph.request(addCheckQuery);

				console.log(succescriteriumId + ' is successfully added!');
				return {
					addCheckId,
					success: true
				};
			} catch (error) {
				console.log(error);
				return {
					success: false
				};
			}
		}

		async function deleteCheckFromList(succescriteriumId) {
			try {
				let getFirstCheckId = (await getFirstCheck()).firstCheckId;

				let deleteCheckQuery = deleteCheck(
					gql,
					websiteUID,
					urlUID,
					getFirstCheckId,
					succescriteriumId
				);
				let deleteCheckId = await hygraph.request(deleteCheckQuery);

				console.log(succescriteriumId + ' is successfully removed!');

				return {
					deleteCheckId,
					success: true
				};
			} catch (error) {
				console.log(error);
				return {
					success: false
				};
			}
		}

		async function getFirstCheck() {
			try {
				let firstCheckQuery = firstCheck(gql, websiteUID, urlUID);
				let firstCheckResponse = await hygraph.request(firstCheckQuery);

				let firstCheckId = firstCheckResponse.website.urls[0].checks[0].id;

				// console.log("id: " + firstCheckId)
				return {
					firstCheckId,
					success: true
				};
			} catch (error) {
				return {
					success: false
				};
			}
		}

		return { success: true };

		// toolboardData.principe.richtlijnen.forEach(richtlijn => {
		// 	allSuccescriteria.push(richtlijn.succescriteria.filter((obj) => obj.niveau == niveau))
		// 	// richtlijn.succescriteria.forEach(succescriterium => {
		// 	// 	allSuccescriteria.push(succescriterium.filter((obj) => obj.niveau == niveau))
		// 	// })
		// })
		// // console.log(allSuccescriteria.flat(Infinity))

		// // loop through all succescriteria that are presented in the current form
		// allSuccescriteria.flat(Infinity).forEach(allSuccescriterium => {
		// 	// does the db checks list already contain the checked box
		// 	if (checkedSuccescriteria.find((obj) => obj.id === allSuccescriterium.id)) {
		// 		allCheckedSuccesscriteria.forEach(allCheckedSuccesscriterium => {
		// 			if (checkedSuccescriteria.find((obj) => obj.id === allCheckedSuccesscriterium)) {
		// 				console.log(allCheckedSuccesscriterium + " ok on")
		// 			} else {
		// 				console.log(allCheckedSuccesscriterium + " will be added")
		// 			}
		// 		})
		// 	}
		// 	if (checkedSuccescriteria.find((obj) => obj.id) !== allSuccescriterium.id) {
		// 		console.log(allSuccescriterium.id + " ok false")
		// 	}
		// })

		// console.log(allSuccescriteria)

		// allCheckedSuccesscriteria.forEach(allCheckedSuccesscriterium => {
		// 	if (checkedSuccescriteria.find((obj) => obj.id === allCheckedSuccesscriterium)) {
		// 		//this succescriterium is already in the checks list of this project
		// 		console.log(allCheckedSuccesscriterium + " yes")
		// 	} else {
		// 		//this succescriterium is not yet in the checks list of this project
		// 		// console.log(allCheckedSuccesscriterium + " no")
		// 		console.log(allCheckedSuccesscriterium + " is being added to the checks list")
		// 	}
		// })
	}
};
