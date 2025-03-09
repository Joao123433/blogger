import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { DefaultLayoutContainer } from "./styles";
import { Footer } from "../../components/Footer";

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
      <Footer />
    </DefaultLayoutContainer>
  )
}