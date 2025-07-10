"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  buttonStyle,
  value,
}: {
  buttonStyle?: string;
  value: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`blue_btn ${buttonStyle}`}
    >
      {value}
    </button>
  );
}
