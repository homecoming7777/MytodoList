import HeroSection from "../components/HeroSection"
import AboutTodo from "../components/AboutTodo"
import Footer from "../components/Footer"


export default function Home() {
   return (
      <>
         <div className="overflow-x-auto">
            <HeroSection></HeroSection>
            <AboutTodo></AboutTodo>
            <Footer></Footer>
         </div>
      </>
   )
}