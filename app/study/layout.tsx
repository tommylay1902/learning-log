import { CookiesProvider } from "next-client-cookies/server";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};

export default Layout;
