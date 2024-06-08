import type { PropsWithChildren } from "react";

const MdxLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="flex items-center justify-center">
      <article className="prose my-8">{children}</article>;
    </section>
  );
};

export default MdxLayout;
