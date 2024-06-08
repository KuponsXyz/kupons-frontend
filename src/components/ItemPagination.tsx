"use client";

import _ from "lodash";
import type { UrlObject } from "url";

import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  // PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = Readonly<{
  previous: boolean;
  next: boolean;
  previousLink: UrlObject;
  nextLink: UrlObject;
}>;

const ItemPagination = ({ previous, next, previousLink, nextLink }: Props) => {
  return (
    <Pagination className="pt-8">
      <PaginationContent>
        {previous && (
          <PaginationItem>
            <PaginationPrevious href={previousLink} />
          </PaginationItem>
        )}
        {next && (
          <PaginationItem>
            <PaginationNext href={nextLink} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ItemPagination;
