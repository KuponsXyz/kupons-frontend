import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center py-8">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">Not found</h1>
      <Button asChild>
        <Link href="/">Back to Homepage</Link>
      </Button>
    </section>
  );
};

export default NotFound;
