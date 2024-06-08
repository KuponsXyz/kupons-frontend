"use client";

import { type PropsWithChildren, useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

const Providers = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {
          enabled: true,
        },
      },

      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We use cookies",
              description:
                "Our website uses cookies to ensure you get the best experience. Tracking cookies help us analyze how our visitors use our website. You can allow all cookies, only essential cookies, or disable all cookies.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage Individual preferences",
            },
            preferencesModal: {
              title: "Manage cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Accept current selection",
              closeIconLabel: "Close modal",
              sections: [
                {
                  title: "Tracking technology & your consent",
                  description:
                    "Cookies are small files that websites uses to collect information and enhance your browsing experience. You can modify your browser settings to decline all or some of these cookies.",
                },
                {
                  title: "Strictly Necessary cookies",
                  description:
                    "These cookies are essential for the proper functioning of the website and cannot be disabled.",

                  //this field will generate a toggle linked to the 'necessary' category
                  linkedCategory: "necessary",
                },
                {
                  title: "Performance and Analytics",
                  description:
                    "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },
    });
  }, []);
  
  return <>{children}</>;
};

export default Providers;
