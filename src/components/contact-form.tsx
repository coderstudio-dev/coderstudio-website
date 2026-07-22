"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const error = await response.text();
        setStatus(`Failed to send message: ${error}`);
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.\n" + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <Input
        className="w-full bg-[#0E1114] border-white/[0.14] text-[#ECEBE2] placeholder:text-[#6C7278] focus-visible:ring-[#5dd0ff]"
        placeholder="Your Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        className="w-full bg-[#0E1114] border-white/[0.14] text-[#ECEBE2] placeholder:text-[#6C7278] focus-visible:ring-[#5dd0ff]"
        placeholder="Your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        className="w-full h-28 px-3 py-2 text-[#ECEBE2] bg-[#0E1114] border border-white/[0.14] resize-none focus:outline-none focus:ring-2 focus:ring-[#5dd0ff] text-sm placeholder:text-[#6C7278]"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button
        type="submit"
        className="w-full bg-[#5dd0ff] text-[#08090B] hover:bg-[#5dd0ff] hover:brightness-110"
        size="lg"
      >
        Send Message
      </Button>
      {status && <p className="text-center text-sm text-[#9AA0A6]">{status}</p>}
    </form>
  );
}
