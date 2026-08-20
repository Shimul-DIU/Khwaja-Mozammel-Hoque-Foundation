import Image from "next/image";
import Navbar from "./component/shared/Navbar/page";
import HomePage from "./home/page";


export default function Home() {
  return (
    <div >
      <Navbar></Navbar>
      <HomePage></HomePage>
    </div>
  );
}
