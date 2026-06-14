import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LandingPage from "@/features/LandingPage";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar />
    <LandingPage />
    <Footer/>
    </>
  );
}
