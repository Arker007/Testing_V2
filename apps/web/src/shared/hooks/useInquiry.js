import { useState, useCallback } from "react";
import api from "../utils/api";

export function useInquiry() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitInquiry = useCallback(async (formData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await api.post("/inquiries", formData);
      setSuccess(true);
      return res;
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
  }, []);

  return { submitInquiry, submitting, success, error, resetState };
}

export default useInquiry;
