import { toast } from "react-toastify";

interface ToastOptions {
  title: string;
  message?: string;
  autoClose?: number;
  variant?: "success" | "error" | "info" | "warning";
}

export default function showAuthToast({
  title,
  message,
  autoClose,
  variant = "error",
}: ToastOptions) {
  const text = message ? `${title}: ${message}` : title;
  toast[variant](text, { autoClose: autoClose ?? 3000 });
}
