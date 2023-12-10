import { Component } from 'react';
import * as ImageService from './Services/Api';
import { Searchbar } from './Searchbar/Searcbar';
// import { isVisible } from '@testing-library/user-event/dist/utils';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGaleryItem';
import { ImageGallery } from './ImageGallery/ImageGalery';
// import { ImageGalleryItem, ImageGallery } from 'components';

class App extends Component {
  state = {
    query: '',
    image: [],
    page: 1,
    isLoading: false,
    error: null,
    isEmpty: false,
    isVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  getImages = async (query, page) => {
    if (!query) {
      this.setState({ isLoading: true });
    }
    try {
      const {
        page: currentPage,
        hits,
        per_page,
        totalHits,
      } = await ImageService.getImages(query, page);
      if (hits.lenghts === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.hits, ...hits],
        isVisible: this.state.page < Math.ceil(totalHits / per_page),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHanldeSubmit = searchQuery => {
    this.setState({ query: searchQuery });
  };
  render() {
    const { images, isVisible, isEmpty, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onHanldeSubmit} />
        {isEmpty && (
          <div textAlign="center">Sorry. There are no images ... 😭</div>
        )}
        {error && (
          <div textAlign="center">❌ Something went wrong - {error}</div>
        )}
        {/* <ImageGallery>
          {images > 0 &&
            images.map(({ tags, id, webformatURL }) => (
              <ImageGalleryItem key={id}></ImageGalleryItem>
            ))}
        </ImageGallery> */}
      </>
    );
  }
}
export default App;
