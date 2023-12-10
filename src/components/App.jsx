import { Component } from 'react';
import * as ImageService from './Services/Api';
import { Searchbar } from './Searchbar/Searcbar';
// import { isVisible } from '@testing-library/user-event/dist/utils';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { FidgetSpinner } from 'react-loader-spinner';

class App extends Component {
  state = {
    query: '',
    images: [],
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
        totalHits,
      } = await ImageService.getImages(query, page);
      if (hits.lenghts === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHanldeSubmit = searchQuery => {
    this.setState({
      query: searchQuery,
      page: 1,
      images: [],
      error: null,
      isEmpty: false,
    });
  };
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { images, isVisible, isEmpty, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onHanldeSubmit} />
        {isEmpty && (
          <h3 textAlign="center">Sorry. There are no images ... 😭</h3>
        )}
        {error && <h3 textAlign="center">❌ Something went wrong - {error}</h3>}
        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>
        {isVisible && !isLoading && images.length > 0 && (
          <Button onClick={this.onLoadMore}>
            {isLoading ? 'Loading' : 'Load more'}
          </Button>
        )}
      </>
    );
  }
}
export default App;
