import { FidgetSpinner } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <FidgetSpinner
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{ marginLeft: '48%' }}
      wrapperClass="dna-wrapper"
      ballColors={['#ff0000', '#00ff00', '#0000ff']}
      backgroundColor="#F4442E"
    />
  );
};
// import { Facebook } from 'react-content-loader';

// export const MyFacebookLoader = () => <Facebook />;
// import { Instagram } from 'react-content-loader';

// export const MyInstagramLoader = () => <Instagram />;
