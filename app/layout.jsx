import "@styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import ThemeProvider from "./ThemeProvider";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Session_Provider from "@components/Session_Provider";
import { PostContextProvider } from "@app/Contex/postContext";
import SearchBox from "@components/SearchBox";
// import { UserProvider } from "@components/contex/userContext";

export const metadata = {
  title: "WYT | Online English Guide",
  description: "Online English guideline and tutoring.",
    manifest: '/manifest.json',
    icons:{logo: '/images/logo.jpg'},
    themeColor: "#009688",
};



const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="app w-screen h-screen flex flex-col items-center bg-gray-200 dark:bg-slate-800 relative">
          <Session_Provider>
            <ThemeProvider>
              <PostContextProvider>
                <Nav />
                <section className="w-full h-full mt-16 mb-16 overflow-auto">
                  <SearchBox />
                  {children}
                </section>
                <Footer />
              </PostContextProvider>
            </ThemeProvider>
          </Session_Provider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
