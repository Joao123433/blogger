import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Contact } from "./pages/Contact";
import { News } from "./pages/News";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}/>
        <Route path="about" element={<About />}/>
        <Route path="news" element={<News />}/>
        <Route path="contact" element={<Contact />}/>
      </Route>
    </Routes>
  )
}