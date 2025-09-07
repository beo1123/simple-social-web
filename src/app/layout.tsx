'use client'
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { QueryProvider } from "../providers/QueryProvider";
import "./globals.css";
import { PersistGate } from "redux-persist/integration/react";
import Header from "@/components/header/Header";


export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-min">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryProvider >
              <Header />
              <main className="grow">

                {children}

              </main>
            </QueryProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
