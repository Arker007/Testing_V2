import { useState, useCallback } from "react";
import api from "../utils/api";

export function useInquiry() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [referenceId, setReferenceId] = useState("");

  const submitInquiry = useCallback(async (formData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await api.post("/inquiries", formData);
      const rawId = res?.data?.id ?? res?.id ?? Math.floor(10000 + Math.random() * 90000);
      const formattedRef = `RFQ-VE-${String(rawId).padStart(5, "0")}`;
      setReferenceId(formattedRef);
      setSuccess(true);
      return { ...res, referenceId: formattedRef };
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setSubmitting(false);
    setSuccess(false);
    setError(null);
    setReferenceId("");
  }, []);

  return { submitInquiry, submitting, success, error, referenceId, resetState };
}

export default useInquiry;
