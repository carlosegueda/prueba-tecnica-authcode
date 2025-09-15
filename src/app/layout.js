import "./globals.css";
export const metadata = {
  title: "Películas De StarWars",
  icons: {
    icon: '/sw-icon.png', // coloca el PNG en /public
  },
};

//Layout Principal
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
