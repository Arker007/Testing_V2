import { useEffect } from "react";
import { useSite } from "../context/SiteContext";

export default function useDocumentTitle(title, description) {
  const { co } = useSite();
  const companyName = co("name", "VISHAL ENTERPRISE");
  
  useEffect(() => {
    // Avoid duplicating the company name if it's already in the title
    if (title && title.includes(companyName)) {
      document.title = title;
    } else {
      document.title = title
        ? `${title} | ${companyName}`
        : `${companyName} | Sustainable Plastic Manufacturing`;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute("content", description);
    }
  }, [title, description, companyName]);
}
