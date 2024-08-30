import { Carousel, Image } from 'antd';
import React from 'react';
import './_activityCarousel.scss';

export default function ActivityCarousel({
  img1,
  img2,
  img3,
  img4,
  img5,
  width,
  height,
}: {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
  width?: number;
  height?: number;
}) {
  const fallback = 'https://placehold.jp/150x150.png';

  return (
    <Carousel autoplay className="imageCarousel">
      <div className="imageContainer">
        <Image
          src={img1}
          preview={false}
          alt="image1"
          width={width ?? '100%'}
          height={height ?? 340}
          fallback={fallback}
          className="image"
        />
      </div>
      <div className="imageContainer">
        <Image
          src={img2}
          preview={false}
          width={width ?? '100%'}
          height={height ?? 340}
          alt="image2"
          fallback={fallback}
          className="image"
        />
      </div>
      <div className="imageContainer">
        <Image
          src={img3}
          preview={false}
          width={width ?? '100%'}
          height={height ?? 340}
          alt="image3"
          fallback={fallback}
          className="image"
        />
      </div>
      <div className="imageContainer">
        <Image
          src={img4}
          preview={false}
          width={width ?? '100%'}
          height={height ?? 340}
          alt="image4"
          fallback={fallback}
          className="image"
        />
      </div>
      <div className="imageContainer">
        <Image
          src={img5}
          preview={false}
          width={width ?? '100%'}
          height={height ?? 340}
          alt="image5"
          fallback={fallback}
          className="image"
        />
      </div>
    </Carousel>
  );
}
