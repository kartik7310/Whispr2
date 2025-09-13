import { graphql } from "../../../gql/"; // adjust path if needed

export const verifyUserGoogleTokenQuery = graphql(`
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);


export const getCurrentUserQuery = graphql(`
  query getCurrentUser {
   getCurrentUser {
   id
   profileImageURL
   email
   firstName
   lastName
   
   }
  }
`)
