import { ErrorBoundary, ToastProvider, CookieConsent } from "@/shared/ui";
import { SiteProvider } from "./providers/SiteProvider";
import AppRouter from "./router/AppRouter";
import "../index.css";

export default function App() {
  return (
    <ErrorBoundary>
      <SiteProvider>
        <ToastProvider>
          <AppRouter />
          <CookieConsent />
        </ToastProvider>
      </SiteProvider>
    </ErrorBoundary>
  );
}
