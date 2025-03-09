import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Header";
import { DefaultLayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
    </DefaultLayoutContainer>
  )
}