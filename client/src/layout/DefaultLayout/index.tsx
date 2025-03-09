import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Header";
import { DefaultLayoutContainer } from "./styles";
import { Footer } from "../../Components/Footer";

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
      <Footer />
    </DefaultLayoutContainer>
  )
}