import "@styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import ThemeProvider from "./ThemeProvider";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Session_Provider from "@components/Session_Provider";
import PostContext from "@components/contex/PostContext";
import SearchBox from "@components/SearchBox";

export const metadata = {
  title: "WYT | Online English Guide",
  description: "English guideline and tutoring.",
};



const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="app w-screen h-screen flex flex-col items-center bg-gray-200 dark:bg-slate-800 relative">
          <Session_Provider>
            <ThemeProvider>
              <Nav />
              {/* <PostContext.Provider value={posts}> */}
                <section className="w-full h-full mt-16 mb-16 overflow-auto">
                  
                    <SearchBox />
                  {children}
                </section>
              {/* </PostContext.Provider> */}
              <Footer />
            </ThemeProvider>
          </Session_Provider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
