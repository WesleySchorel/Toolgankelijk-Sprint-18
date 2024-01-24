export default function getQueryAddUrl(gql, name, formUrl, partnerSlug) {
	return gql`
    mutation {
        createUrl(
          data: {url: "${formUrl}", slug: "${name}", website: {connect: {slug: "${partnerSlug}"}}}
        ) {
          id
        }
        publishUrl(where: {slug: "${name}"}) {
          id
        }
      }
  `;
}