import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import App from './app/app';

Sentry.init({
  dsn: "https://433e30490856408184424810f18e3426@o1242958.ingest.sentry.io/4504295462207488",
  integrations: [new BrowserTracing()],
  release: __APP_VERSION__,
  tracesSampleRate: 1.0,
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
