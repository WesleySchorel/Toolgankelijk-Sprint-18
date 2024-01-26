export default function getQueryToolboard(gql, slugUrl, principeSlug) {
	return gql`
    query Toolboard {
        url(where: {slug: "${slugUrl}"}) {
          id
          url
          slug
          checks(first: 1) {
            succescriteria(first: 100) {
              id
              index
              niveau
            }
          }
        }
        principe(where: {slug: "${principeSlug}"}) {
          titel
          beschrijving {
            html
          }
          richtlijnen {
            titel
            succescriteria(first: 200) {
              id
              titel
              index
              niveau
            }
            index
            slug
            uitleg {
              html
            }
          }
          checklistItems {
            check
          }
          index
        }
        principes {
          titel
          id
          checklistItems {
            check
          }
          richtlijnen {
            titel
            succescriteria(first: 200) {
              id
              titel
              index
              niveau
            }
            index
            slug
            uitleg {
              html
            }
          }
          index
          slug
        }
      }
      `;
}
