import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/constants";

export interface FormSubmissionState {
  submitting: boolean;
  succeeded: boolean;
  err: string | null;
  setErr: (err: string | null) => void;
  submit: (form: HTMLFormElement) => Promise<void>;
  reset: () => void;
}

export function useFormSubmission(): FormSubmissionState {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(form: HTMLFormElement) {
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSucceeded(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setErr(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setErr("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSucceeded(false);
    setErr(null);
    setSubmitting(false);
  }

  return { submitting, succeeded, err, setErr, submit, reset };
}
