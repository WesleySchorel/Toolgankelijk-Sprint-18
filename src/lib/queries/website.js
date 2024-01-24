export default function getQueryWebsite(gql, slug) {
	return gql`
		query Website {
			website(where: { slug: "${slug}" }) {
				titel
				homepage
				urls {
					id
					url
					updatedAt
					slug
					checks {
						succescriteria {
							id
						}
					}
				}
			}
			principes {
				titel
				richtlijnen {
					titel
					succescriteria(first: 200) {
						id
					}
				}
			}
		}
	`;
}
