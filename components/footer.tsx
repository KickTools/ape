// components/Footer.tsx
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex gap-6 py-4 justify-center text-center text-sm">
      <p>
        © {new Date().getFullYear()} · {siteConfig.footer.description.footer}
      </p>
      <p>·</p>
      <p>
        {Object.entries(siteConfig.footer.links).map(([key, href]) => (
          <Link key={key} href={href} className="mr-2 hover:underline hover:text-danger">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
        ))}
      </p>
    </footer>
  );
}