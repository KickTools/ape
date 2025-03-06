// src/components/ContactForm.jsx
"use client";

import { useState } from "react";
import Button from "@/components/elements/Button";
import Link from "next/link";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Keep this to prevent default behavior, though form is disabled
  };

  return (
    <div className="flex flex-col space-y-16 max-w-5xl mx-auto px-6 py-16 md:py-32">
      <section className="bg-background-400/80 p-8 md:p-16 rounded-xl text-center max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase relative">
          Contact Us
          <span className="after:content-['.'] after:text-apeRed-500 after:font-bold after:ml-2"></span>
        </h2>
        <p className="text-lg text-foreground-600 mb-8">
          Get in touch with the Ape Gang team. We'd love to hear from you!
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto"
        >
          <div className="w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2 focus:outline-none focus:border-apeRed-500/50 transition-colors opacity-50 cursor-not-allowed"
              disabled // Disable input
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2 focus:outline-none focus:border-apeRed-500/50 transition-colors opacity-50 cursor-not-allowed"
              disabled // Disable input
            />
          </div>
          <div className="w-full">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2 h-32 focus:outline-none focus:border-apeRed-500/50 transition-colors opacity-50 cursor-not-allowed"
              disabled
            ></textarea>
            <p className="text-sm text-foreground-600 mt-2">
              If you'd like to get ahold of us for now,{" "}
              <Link
                href="https://kicktools.app/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apeRed hover:underline"
              >
                contact us on Discord
              </Link>.
            </p>
          </div>
          <Button
            type="submit"
            color="apeRed"
            size="medium"
            radius="md"
            disabled // Disable button
            className="opacity-50 cursor-not-allowed"
          >
            Send Your Message
          </Button>
        </form>
      </section>
    </div>
  );
}