import ImageGallery from "react-image-gallery";
import image1 from '../../../Assets/image1.png'
import image2 from '../../../Assets/image2.png'
import image3 from '../../../Assets/image3.jpg'


export default function ImageSlider() {

  const images = [
    {
      original: image1,
    },
    {
      original: image2,
    },
    {
      original: image3,
    },
  ];
  return (
    <ImageGallery items={images}
      showFullscreenButton={false}
      showPlayButton={false}
      showNav={false}
      autoPlay={true}
      slideInterval={3000}
      slideDuration={1000}
      infinite={true}
    />
  )
}
