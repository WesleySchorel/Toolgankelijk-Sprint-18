export default function getQueryDeleteUrl(gql, id) {
	return gql`
		mutation {
			deleteUrl(where: { id: "${id}" }) {
				id
			}
		}
	`;
}
