import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Capabilities } from "@/sections/Capabilities";
import { Skills } from "@/sections/Skills";
import { Work } from "@/sections/Work";
import { Process } from "@/sections/Process";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      <Skills />
      <Work />
      <Process />
      <Experience />
      <Contact />
    </>
  );
}
