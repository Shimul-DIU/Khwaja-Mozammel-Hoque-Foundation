import Image from "next/image";
import Navbar from "./component/shared/Navbar/page";
import HomePage from "./home/page";
import RegistrationForm from "./(auth)/registration/page";


export default function Home() {
  return (
    <div >

      {/* <RegistrationForm></RegistrationForm> */}
      <HomePage></HomePage>
    </div>
  );
}
