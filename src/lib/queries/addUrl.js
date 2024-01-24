export default function getQueryAddUrl(gql, name, formUrl, formSlug) {
	return gql`
    mutation {
        createUrl(
          data: {url: "${formUrl}", slug: "${name}", website: {connect: {slug: "${formSlug}"}}}
        ) {
          id
        }
        publishUrl(where: {slug: "${name}"}) {
          id
        }
      }
  `;
}