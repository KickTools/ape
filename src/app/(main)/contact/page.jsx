// src/components/ContactForm.jsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col space-y-16 max-w-5xl mx-auto px-6 py-16 md:py-32">
      <section className="bg-background-400/80 p-8 md:p-16 rounded-xl text-center max-w-5xl">
        {/* Header with pseudo-element styling */}
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase relative">
          Contact Us
          <span className="after:content-['.'] after:text-apeRed-500 after:font-bold after:ml-2"></span>
        </h2>
        <p className="text-lg text-foreground-600 mb-8">
          Get in touch with the Ape Gang team. We&apos;d love to hear from you!
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto"
        >
          {/* Name Input */}
          <div className="w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2 focus:outline-none focus:border-apeRed-500/50 transition-colors"
              required
            />
          </div>

          {/* Email Input */}
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2 focus:outline-none focus:border-apeRed-500/50 transition-colors"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="w-full">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full rounded-md border-transparent hover:border-foreground/70 bg-background-300/5 border-2 px-3 py-2 h-32 focus:outline-none focus:border-apeRed-500/50 transition-colors"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-apeRed text-foreground font-bold py-3 px-6 rounded-full transition hover:shadow-apeRed/20 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
             Send Your Message
          </button>
        </form>
      </section>
    </div>
  );
}
