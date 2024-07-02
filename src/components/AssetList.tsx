import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ASSETS } from '../queries/getAssets';

interface Profile {
  urlWhitepaper: string;
  urlDocumentation: string;
  foundingDate: string;
  logo: string;
  name: string;
  descriptionShort: string;
}

interface Asset {
  urlToAssetDocs: string;
  profileId: string;
  profile: Profile;
}

const AssetList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ASSETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredAssets(data.assets);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredAssets(data.assets);
    } else {
      const filtered = data.assets.filter((asset: Asset) =>
        asset.profile.name.toLowerCase().includes(query) ||
        asset.profile.descriptionShort.toLowerCase().includes(query)
      );
      setFilteredAssets(filtered);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8"> Assets</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/4  p-2 border rounded-lg"
        />
      </div>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssets.map((asset) => (
          <li key={asset.profileId} className="bg-white rounded-3xl m-4 shadow-md p-4 flex flex-col items-center">
          <img src={asset.profile.logo} alt={`${asset.profile.name} logo`} className="h-16 w-40 mb-4"/>
          <h2 className="text-xl font-semibold text-center">{asset.profile.name}</h2>
          <p className="text-gray-700 text-center">{asset.profile.descriptionShort}</p>
          <div className="mt-4 flex flex-col space-y-2">
            <a href={asset.urlToAssetDocs} className="text-blue-500 text-center">Asset Docs</a>
            <a href={asset.profile.urlWhitepaper} className="text-blue-500 text-center">Whitepaper</a>
            <a href={asset.profile.urlDocumentation} className="text-blue-500 text-center">Documentation</a>
            <p className="text-gray-700 text-center">Founded on: {new Date(asset.profile.foundingDate).toLocaleDateString()}</p>
          </div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
