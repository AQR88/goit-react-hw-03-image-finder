// import css from '../Styles/styles.css';

// export const ImageGalleryItem = () => {
//   return (
//     <li className={css.ImageGalleryItem}>
//       <img
//         src={webformatURL}
//         alt={tags}
//         className={css['ImageGalleryItem-image']}
//       />
//     </li>
//   );
// };
import styled from '@emotion/styled';

export const ImageGaleryItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
