import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroRight from "../../public/assets/hero-right.svg"
import heroLeft from "../../public/assets/hero-left.svg"
import heroMiddle from "../../public/assets/hero-middle.svg"
import { features } from "./data";
import Footer from "@/components/footer";



export default function Home() {
  return (
    <div className="w-full"> 
    <div className="px-10 hero pt-2 bg-hero w-full">
      <div className=" py-5 hero-container mx-auto lg:max-w-4xl">
      <div className="px-2">
      <Navbar/>
      </div>
      <section className="hero-content text-center">
        <h1 className="text-4xl font-bold text-center mt-8">Brush up your knowledge <br/> through the interactive quiz</h1>
        <div className="mt-4 font-caveat-brush">
          <Button className="m-2 text-2xl">Play</Button>
          <Button variant="secondary" className="text-2xl">Learn how to play</Button>
        </div>
        <div className="hero-images flex justify-between ">
        <Image src={heroLeft} alt="Giving certificate" width={200} height={200} className="hidden sm:block"/>
        <Image src={heroMiddle} alt="Question" width={200} height={200} className="hidden sm:block"/>
        <Image src={heroRight} alt="person reading a book" width={100} height={200} className="hidden sm:block"/>
        </div>

        
      </section>
      </div>
    </div>
    <div className="feature-section py-6 w-full">
      <div className="px-10 py-5 feature-container mx-auto lg:max-w-4xl">
      <div className="features flex flex-col gap-10">
          <div key={features[0].title} className="feature-card flex justify-between gap-10">
            <Image src={features[0].image} alt={features[0].alt} height={200} width={200} className="hidden md:block" />
            <div>
            <h2 className="text-2xl font-bold">{features[0].title}</h2>
            <p className="text-lg">{features[0].content}</p>
            </div>
          </div>
          <div key={features[1].title} className="feature-card flex justify-between gap-10">
            <div>
            <h2 className="text-2xl font-bold">{features[1].title}</h2>
            <p className="text-lg">{features[1].content}</p>
            </div>
            <Image src={features[1].image} alt={features[1].alt} height={200} width={200} className="hidden md:block"/>
          </div>
          <div key={features[2].title} className="feature-card flex justify-between gap-10">
            <Image src={features[2].image} alt={features[2].alt} height={200} width={200} className="hidden md:block"/>
            <div>
            <h2 className="text-2xl font-bold">{features[2].title}</h2>
            <p className="text-lg">{features[2].content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </div>
  );
}
