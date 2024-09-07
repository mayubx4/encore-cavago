import BookingGallery from "@/components/bookingDetails/bookingGallery";
import BookingTitle from "@/components/bookingDetails/bookingTitle";
import BookingDetail from "@/components/bookingDetails/bookingDetail";
import BookingPriceDetails from "@/components/bookingDetails/bookingPriceDetails";
import { Col, Flex, Row } from "antd";
import BookingAvailability from "@/components/bookingDetails/bookingAvailability/bookingAvailability";
import BookingActivity from "@/components/bookingDetails/bookingActivites/bookingActivity";
import BookingItinerary from "@/components/bookingDetails/bookingItinerary/bookingItinerary";
import BookingLocation from "@/components/bookingDetails/bookingLocation/bookingLocation";
import BookingPayment from "@/components/bookingDetails/bookingPayment/bookingPayment";
import BookingThingsToKnow from "@/components/bookingDetails/bookingThingsToKnow/bookingThingsToKnow";

export default function page() {
  return (
    <>
      <BookingTitle />
      <BookingGallery />
      <Row className='mt-10'>
        <Col md={14} xl={15}>
          <div className='pr-10'>
            <BookingDetail />
            <BookingAvailability />
            <BookingActivity />
            <BookingItinerary />
          </div>
        </Col>
        <Col md={9} xl={8}>
          <BookingPriceDetails />
        </Col>
      </Row>
      <Flex vertical style={{ width: "100%" }}>
        <BookingLocation />
        <BookingPayment />
        <BookingThingsToKnow />
      </Flex>
    </>
  );
}
