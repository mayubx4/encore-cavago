import BookingGallery from "@/components/bookingDetails/bookingGallery";
import BookingTitle from "@/components/bookingDetails/bookingTitle";
import BookingDetail from "@/components/bookingDetails/bookingDetail";
import { Col, Flex, Row } from "antd";
import BookingAvailability from "@/components/bookingDetails/bookingAvailability/bookingAvailability";
import BookingActivity from "@/components/bookingDetails/bookingActivites/bookingActivity";
import BookingItinerary from "@/components/bookingDetails/bookingItinerary/bookingItinerary";
import BookingLocation from "@/components/bookingDetails/bookingLocation/bookingLocation";
import BookingPayment from "@/components/bookingDetails/bookingPayment/bookingPayment";
import BookingThingsToKnow from "@/components/bookingDetails/bookingThingsToKnow/bookingThingsToKnow";

export default function page() {
  return (
    <Flex vertical style={{ marginTop: "55px", paddingInline: "240px", }}>
      <BookingTitle />
      <BookingGallery />
      <Row>
        <Col span={12}>
          <BookingDetail />
          <BookingAvailability />
          <BookingActivity />
          <BookingItinerary />
        </Col>
      </Row>
      <Flex vertical style={{ width: "100%" }}>
        <BookingLocation />
        <BookingPayment />
        <BookingThingsToKnow />
      </Flex>
    </Flex>
  );
}
