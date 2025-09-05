'use client'
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { QueryProvider } from "../providers/QueryProvider";
import "./globals.css";
import { PersistGate } from "redux-persist/integration/react";


export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryProvider >
              {children}
            </QueryProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
