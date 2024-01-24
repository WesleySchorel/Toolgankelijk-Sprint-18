export default function getQueryPartner(gql) {
	return gql`
		query MyQuery {
			websites(first: 20) {
				id
				titel
				slug
				homepage
				updatedAt
				urls {
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
