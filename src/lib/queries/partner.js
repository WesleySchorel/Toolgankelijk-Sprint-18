export default function getQueryPartner(gql){
    return gql`
    query Program {
        websites(first: 20) {
            id
            titel
            slug
            homepage
        }
    }`
}