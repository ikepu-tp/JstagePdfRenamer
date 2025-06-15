import { StrictMode } from "react";
import { Container, createRoot, RootOptions } from "react-dom/client";

export default function render(
  container: Container,
  children: React.ReactNode,
  options: undefined | RootOptions = undefined
): void {
  createRoot(container, options).render(<StrictMode>{children}</StrictMode>);
}
