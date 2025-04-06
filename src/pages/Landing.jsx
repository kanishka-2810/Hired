import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from '@/components/ui/accordion'
import faq from '../data/faq.json'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
    useGSAP(()=> {
        gsap.to('.landing',{ opacity:1, delay:0.5, stagger: 0.25,})
        gsap.to('#btn', {opacity: 1, delay: 1, translateY: 0, })
        gsap.to('.scroll_animation', {
            y: 0,
            opacity:1,
            duration:1,
            stagger: 0.50,
            scrollTrigger: {
                trigger: '.scroll_animation',
                start: 'top 80%',
                end: 'top 30%',
            },
        })
      },[])

      
    return (
        <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
            <section className='text-center opacity-0 landing'>
                <h1 className='flex= flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>Find Your Dream Job {' '}
                <br/>and get Hired
                </h1>
                <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl opacity-0 landing'>Explore thousands of job listings or find the perfect candidate</p>
            </section>

            {/* button */}
            <div 
            className='flex gap-6 justify-center opacity-0 translate-y-20'
            id='btn'>
                <Link to="/jobs">
                    <Button variant="blue" size='xl'>Find Jobs</Button>
                </Link>
                <Link to="/post-job">
                    <Button variant= 'destructive' size='xl'>Post a Job</Button>
                </Link>
            </div>

            {/* carousel */}
            <Carousel plugins={[Autoplay({delay: 2000})]} className= 'w-full py-10'>
            <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
            {companies.map(({name,path,id}) => {
                return(
                    <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
                        <img src={path} alt={name} className='h-9 sm:h-14 object-contain' />
                    </CarouselItem>
                )
            })}
            </CarouselContent>
            </Carousel>

            {/* banner */}
            <div className='opacity-0 translate-y-0 scroll_animation'>
            <img src="/banner.jpg" alt="banner" className='w-full'/>
            </div>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Card className="bg-blue-700 scroll_animation opacity-0 translate-y-0">
            <CardHeader>
                <CardTitle>For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
                Search and apply for jobs, track applications, and more.
            </CardContent>
            </Card>
            <Card className="bg-blue-700 scroll_animation opacity-0 translate-y-0">
            <CardHeader>
                <CardTitle>For Employers</CardTitle>
            </CardHeader>
            <CardContent>
                Post jobs, manage applications, and find the best candidates.
            </CardContent>
            </Card>
            </section>

            <Accordion type="single" collapsible>
            {faq.map(({question, answer}, i) => (
                <AccordionItem value={`item-${i+1}`} key={i}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>
                {answer}
                </AccordionContent>
            </AccordionItem>
            ))}
            </Accordion>


        </main>
    )
}

export default Landing