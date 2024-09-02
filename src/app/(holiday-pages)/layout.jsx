import { Figtree } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: figtree.style.fontFamily, // Apply Figtree font to all Ant Design components
          },
          components: {
            Button: {
              fontSize: "18px",
              fontWeight: "bold",
              paddingBlock: "16px",
              paddingInline: "20px",
              colorText: "#233240",
              colorTextSecondary: "#2C3F50",
              colorBorder: "white",
            },
            Typography: {
              fontSizeHeading2: "32px",
              fontSize: "24px",
            },
          },
        }}
      >
        <div className='max-w-[1728px] mx-auto'>{children}</div>
      </ConfigProvider>
    </AntdRegistry>
  );
}
