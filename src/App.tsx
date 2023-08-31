import ImageList from "./components/ImageList"
import ScrollToTop from "./components/ScrollToTop";
import SearchForm from "./components/SearchForm"
import * as React from "react";

function App() {
  React.useEffect(() => {
    document.title = 'React Image Gallery';
  }, []);
  
  return (
    <main className="flex flex-col w-full min-h-screen overflow-hidden">
      <ScrollToTop />
      <SearchForm />
      <ImageList />
    </main>
  )
}

export default App