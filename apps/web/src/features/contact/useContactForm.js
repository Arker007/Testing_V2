import { useState, useCallback } from "react";

export function useContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    estimatedVolume: "",
    message: "",
    productService: "",
    country: "India",
    phonePrefix: "+91",
  });
  const [status, setStatus] = useState("");
  const [copiedKey, setCopiedKey] = useState("");

  const handleCopy = useCallback((text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
  }, []);

  const handleChange = useCallback((key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const composedMessage = `
Product/Service Looking For: ${form.productService || "Not specified"}
Country: ${form.country || "Not specified"}
Phone Code: ${form.phonePrefix || "+91"}

Message:
${form.message}
`.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: `${form.phonePrefix || "+91"} ${form.phone || ""}`.trim(),
          company: form.productService || "Inquiry",
          message: composedMessage,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }, [form]);

  const resetStatus = useCallback(() => setStatus(""), []);

  return {
    form,
    status,
    copiedKey,
    handleCopy,
    handleChange,
    handleSubmit,
    resetStatus,
  };
}
