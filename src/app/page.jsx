import MenuNavbar from "@/components/MenuNavbar";
import Header from "@/components/parts/Header";
import AboutUs from "@/components/parts/AboutUS";
import Programs from "@/components/parts/programs/Programs";
import Events from "@/components/parts/events/Events";
import FeedbackForm from "@/components/parts/FeedbackForm";
import Partners from "@/components/parts/Partners";
import Footer from "@/components/parts/Footer";

export default function Home() {
  return (
    <div>
      <MenuNavbar></MenuNavbar>
      <Header></Header>
      <AboutUs></AboutUs>
      <Programs></Programs>
      <Events></Events>
      <FeedbackForm></FeedbackForm>
      <Partners></Partners>
      <Footer></Footer>
    </div>
  );
}
