import { itemList } from "@/services/items";

import Hero from "@/components/Hero";
import Featured from "@/components/Featured";

export const dynamic = "force-dynamic";

const Page = async () => {
  const items = await itemList();
  const mostSubscribedQuery = { ordering: "subscribers" };
  const mostRecentQuery = { ordering: "created" };
  const mostRatedQuery = { ordering: "rating" };
  const mostReviewsQuery = { ordering: "reviews" };
  const endingSoonQuery = { ordering: "ending" };
  const usesRemainingQuery = { ordering: "remaining" };
  const mostSubscribed = await itemList(mostSubscribedQuery);
  const mostRecent = await itemList(mostRecentQuery);
  const mostRated = await itemList(mostRatedQuery);
  const mostReviews = await itemList(mostReviewsQuery);
  const endingSoon = await itemList(endingSoonQuery);
  const usesRemaining = await itemList(usesRemainingQuery);

  return (
    <>
      <Hero items={items.results} />
      <Featured
        name="Most popular"
        url={{
          pathname: "/items",
          query: mostSubscribedQuery,
        }}
        items={mostSubscribed.results}
      />
      <Featured
        name="Most recent"
        url={{
          pathname: "/items",
          query: mostRecentQuery,
        }}
        items={mostRecent.results}
      />
      <Featured
        name="Ending soon"
        url={{
          pathname: "/items",
          query: endingSoonQuery,
        }}
        items={endingSoon.results}
      />
      <Featured
        name="Uses remaining"
        url={{
          pathname: "/items",
          query: usesRemainingQuery,
        }}
        items={usesRemaining.results}
      />
      <Featured
        name="Most reviewed"
        url={{
          pathname: "/items",
          query: mostReviewsQuery,
        }}
        items={mostReviews.results}
      />
      <Featured
        name="Highest rated"
        url={{
          pathname: "/items",
          query: mostRatedQuery,
        }}
        items={mostRated.results}
      />
    </>
  );
};

export default Page;
