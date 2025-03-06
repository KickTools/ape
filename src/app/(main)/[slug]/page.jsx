// src/app/(main)/[slug]/page.jsx
import AboutPage from "@/components/main/AboutPage";
import ContactForm from "@/components/main/ContactForm";
import FAQPage from "@/components/main/FAQPage";
import { notFound } from "next/navigation";

const pages = {
  about: AboutPage,
  contact: ContactForm,
  faq: FAQPage,
};

export async function generateMetadata({ params }) {
  const metadataMap = {
    about: { title: "About the Ape Gang Project | Ape Gang Community - SquadW Online", description: "Learn more about our company." },
    contact: { title: "Contact us | Ape Gang Community - SquadW Online", description: "Pick our brains and send us a message" },
    faq: { title: "FAQ | Apge Gang Community - SquadW Online", description: "Frequently Asked Questions." },
    default: { title: "Welcome to the Ape Gang Community - Squad", description: "Welcome to our website." }
  };

  return metadataMap[params.slug] || metadataMap.default;
}

export default function DynamicPage({ params }) {
  const PageComponent = pages[params.slug];

  if (!PageComponent) {
    notFound();
  }

  return <PageComponent />;
}