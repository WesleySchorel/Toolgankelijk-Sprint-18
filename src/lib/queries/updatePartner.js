export default function getQueryUpdatePartner(gql, name, slug, url, id) {
	return gql`
		mutation {
			updateWebsite(
				data: {titel: "${name}", homepage: "${url}", slug: "${slug}"}
				where: { id: "${id}" }
			) {
				id
			}
		}
	`;
}
