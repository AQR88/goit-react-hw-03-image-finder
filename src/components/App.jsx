import { Component } from 'react';
import * as ImageService from './Services/Api';
import { Searchbar } from './Searchbar/Searchbar';
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
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
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
      const { hits, totalHits } = await ImageService.getImages(query, page);
      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: alert(`Something went wrong: ${error}`) });
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
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };
  render() {
    const { images, isVisible, isEmpty, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onHanldeSubmit} />

        {isEmpty && (
          <h3 style={{ textAlign: 'center' }}>
            Sorry. There are no images ... 😭
          </h3>
        )}
        {error && (
          <h3 style={{ textAlign: 'center' }}>
            ❌ Something went wrong - {error}
          </h3>
        )}
        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>

        {isVisible && !isLoading && images.length > 0 && (
          <Button onClick={this.onLoadMore}>
            {isLoading ? 'Loading' : 'Load more'}
          </Button>
        )}
        {isLoading && (
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{ marginLeft: '45%' }}
            wrapperClass="dna-wrapper"
            ballColors={['#ff0000', '#00ff00', '#0000ff']}
            backgroundColor="#F4442E"
          />
        )}
      </>
    );
  }
}
export default App;
