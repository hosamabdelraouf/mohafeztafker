import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { LinksFunction } from "react-router";
import { APP_TITLE } from "@/lib/app-config";

import stylesheet from "./global.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="ltr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#0284c7" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content={APP_TITLE} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon-180.svg" />
        <Meta />
        <Links />
      </head>
      <body dir="rtl">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      <main
        dir="ltr"
        className="agent-native-app-main min-w-0 flex-1 overflow-y-auto overscroll-contain snap-y snap-mandatory scroll-smooth"
      >
        <div dir="rtl" className="w-full min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">عذراً، حدث خطأ غير متوقع</h1>
        <p className="text-slate-600 mb-4">{error instanceof Error ? error.message : "يرجى تحديث الصفحة"}</p>
        <a href="/" className="px-5 py-2.5 rounded-xl bg-[#0284c7] text-white font-bold text-sm">
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}
