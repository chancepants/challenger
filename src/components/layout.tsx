import { ThemeProvider } from '@emotion/react';
import { NavBar } from './navbar';
import darkTheme from '../lib/theme';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <NavBar />
        <main>{children}</main>
      </ThemeProvider>
    </>
  );
}
