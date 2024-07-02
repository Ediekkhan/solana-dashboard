import { gql } from '@apollo/client';

export const GET_ASSETS = gql`
  query GetAssets {
    assets {
      urlToAssetDocs
      profileId
      profile {
        urlWhitepaper
        urlDocumentation
        foundingDate
        logo
        id
        name
        descriptionShort
      }
    }
  }
`;
