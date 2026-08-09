import ErrorBoundary from "../shared/components/ErrorBoundary";
import { SiteProvider } from "./providers/SiteProvider";
import AppRouter from "./router/AppRouter";
import "../index.css";

export default function App() {
  return (
    <ErrorBoundary>
      <SiteProvider>
        <AppRouter />
      </SiteProvider>
    </ErrorBoundary>
  );
}
