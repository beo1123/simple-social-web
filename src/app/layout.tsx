'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';
import Header from '@/components/header/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryProvider>
              <Header />
              <main className="min-h-screen bg-primary-light grow">
                {children}
              </main>
            </QueryProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}