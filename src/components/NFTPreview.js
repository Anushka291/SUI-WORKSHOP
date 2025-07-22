import React from 'react';

const NFTPreview = ({ imageUrl }) => {
  return (
    <div className="nft-preview">
      <p>Preview:</p>
      {imageUrl ? (
        <img src={imageUrl} alt="NFT Preview" />
      ) : (
        <div className="nft-placeholder">NFT image will appear here</div>
      )}
    </div>
  );
};

export default NFTPreview;
