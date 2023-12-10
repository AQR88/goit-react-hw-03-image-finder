// import css from '../Styles/styles.css';
// import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGaleryItem';

// export const ImageGallery = ({ galleryItems }) => {
//   return (
//     <ul className={css.ImageGallery}>
//       {galleryItems.map(galleryItem => {
//         return (
//           <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
//         );
//       })}
//     </ul>
//   );
// };
import styled from '@emotion/styled';

export const ImageGalery = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 5px;
`;
