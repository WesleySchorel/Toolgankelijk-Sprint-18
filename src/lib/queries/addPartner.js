export default function getQueryAddPartner(gql, name, url, slug) {
	return gql`
  mutation {
    createWebsite(data: {titel: "${name}", homepage: "${url}", slug: "${slug}"}) {
      id
      titel
      homepage
      slug
    }
    publishWebsite(where: {slug: "${slug}"}) {
      id
      titel
    }
  }
  `;
}
