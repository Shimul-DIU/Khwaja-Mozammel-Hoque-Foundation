import Image from "next/image";
import Navbar from "./component/shared/Navbar/page";
import Banner from "./component/home/page";

export default function Home() {
  return (
    <div >
      <Navbar></Navbar>
      <Banner></Banner>
    </div>
  );
}
