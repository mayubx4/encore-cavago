import { StaticImageData } from 'next/image';

type BookingDetails = {
  title: string;
  location: string;
  rating: number;
  noOfReviews: number;
  imageSrc: StaticImageData;
}

export default BookingDetails;
