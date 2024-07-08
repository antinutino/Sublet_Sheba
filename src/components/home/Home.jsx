import { Outlet } from "react-router-dom";
import Navber from "../navber/Navber";
import Footer from "../footer/Footer";



export default function Home() {

  return (
    <div>
      <Navber></Navber>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  );
};