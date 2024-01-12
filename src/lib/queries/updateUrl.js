export default function getQueryUpdateUrl(gql, slug, url, id) {
	return gql`
		mutation {
			updateUrl(
				data: {
					slug: "${slug}"
					url: "${url}"
				}
				where: { id: "${id}" }
			) {
				id
			}
		}
	`;
}
