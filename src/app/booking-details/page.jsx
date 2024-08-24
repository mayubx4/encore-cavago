import BookingGallery from "@/components/bookingDetails/bookingGallery";
import BookingTitle from "@/components/bookingDetails/bookingTitle";
import Header from "@/components/header/header";
import { Flex } from "antd";

export default function page() {
  return (
    <Flex vertical>
      <Header />
      <Flex vertical style={{ marginTop: "55px", paddingInline: "240px" }}>
        <BookingTitle />
        <BookingGallery />
      </Flex>
    </Flex>
  );
}
