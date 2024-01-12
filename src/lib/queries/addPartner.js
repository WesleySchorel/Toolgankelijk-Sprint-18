export default function getQueryAddPartner(gql, name, url) {
	return gql`
  mutation {
    createWebsite(data: {titel: "${name}", homepage: "${url}", slug: "${name}"}) {
      id
      titel
      homepage
      slug
    }
    publishWebsite(where: {slug: "${name}"}) {
      id
      titel
    }
  }
  `;
}
