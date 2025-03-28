'use client';
import TeamSection from '../components/TeamSection';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Ecosystem from '../components/Community';
import Header from '@/components/Header';
import InfiniteLogos from '@/components/Logos';
import Footer from '@/components/Footer';


export default function HomePage() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Hero />
        <Feature />
        <Ecosystem />
        <InfiniteLogos/>
        <TeamSection />
        <Footer/>
      </main>
    </>
  );
}
