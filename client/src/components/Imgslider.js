import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Imgslider.css";


const Imgslider = () => {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,          // 👈 Enables peeking of adjacent slides
    centerPadding: '60px',     // 👈 Adjust how much of next/prev slide you want visible
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        <div className="slide">
          <a href="#">
            <img src="/images/slider-1.png" alt="Slide 1" />
          </a>
        </div>

        <div className="slide">
          <a href="#">
            <img src="/images/slider-5.png" alt="Slide 2" />
          </a>
        </div>

        <div className="slide">
          <a href="#">
            <img src="/images/slider-1.png" alt="Slide 3" />
          </a>
        </div>

        <div className="slide">
          <a href="#">
            <img src="/images/slider-5.png" alt="Slide 4" />
          </a>
        </div>
      </Slider>
    </div>
  );
};

export default Imgslider;