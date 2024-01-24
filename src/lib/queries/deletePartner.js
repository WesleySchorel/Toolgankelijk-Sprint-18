export default function getQueryDeletePartner(gql, id) {
	return gql`
		mutation {
			deleteWebsite(where: { id: "${id}" }) {
				id
			}
		}
	`;
}
