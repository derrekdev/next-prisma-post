import CookiesClient from "@/components/CookiesClient/CookiesClient";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <CookiesClient>{children}</CookiesClient>
    </main>
  );
};

export default layout;
