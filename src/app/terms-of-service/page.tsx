import { type Metadata } from "next";

import MdxLayout from "@/components/MdxLayout";
import TermsOfService from "@/markdown/TermsOfService.mdx";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const Page = () => {
  return (
    <MdxLayout>
      <TermsOfService />
    </MdxLayout>
  );
};

export default Page;
