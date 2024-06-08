import { type Metadata } from "next";

import MdxLayout from "@/components/MdxLayout";
import PrivacyPolicy from "@/markdown/PrivacyPolicy.mdx";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const Page = () => {
  return (
    <MdxLayout>
      <PrivacyPolicy />
    </MdxLayout>
  );
};

export default Page;
