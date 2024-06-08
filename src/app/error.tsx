"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center py-8">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">An error occurred</h1>
      <Button asChild>
        <Link href="/">Back to Homepage</Link>
      </Button>
    </section>
  );
};

export default Error;
