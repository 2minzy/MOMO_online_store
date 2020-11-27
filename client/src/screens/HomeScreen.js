import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import video from '../images/showcase.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomeScreen = () => {
  const refSlide1 = useRef(null);
  const refSlide2 = useRef(null);
  const refSlide3 = useRef(null);
  const refSlide4 = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const sections = [refSlide1, refSlide2, refSlide3, refSlide4].map(
      ref => ref.current
    );

    const triggers = sections.map(panel => {
      return ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        pin: true,
        pinSpacing: false,
      });
    });

    const snap = ScrollTrigger.create({
      snap: 1 / (sections.length - 1),
    });

    return function cleanup() {
      triggers.map(trigger => trigger.kill());
      snap.kill();
    };
  }, [refSlide1, refSlide2, refSlide3, refSlide4]);

  useEffect(() => {
    gsap.from(refSlide1.current, {
      duration: 1,
      autoAlpha: 0,
      ease: 'none',
      delay: 1,
    });

    gsap.fromTo(
      textRef.current,
      {
        autoAlpha: 0,
      },
      {
        duration: 1,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div>
      <Meta />
      <section className='section showcase' ref={refSlide1}>
        <div className='showcase__video'>
          <video src={video} autoPlay muted loop></video>
        </div>
        <div className='section__content'>
          <h1 className='section__content__title'>NEW IN</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/shop'>VIEW</Link>
        </div>
      </section>

      <section className='section' ref={refSlide2}>
        <div className='section__image section__image--a'></div>
        <div className='section__content'>
          <h1 className='section__content__title'>NEW IN</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/shop'>VIEW</Link>
        </div>
      </section>

      <section className='section' ref={refSlide3}>
        <div className='section__image section__image--b'></div>
        <div className='section__content'>
          <h1 className='section__content__title'>NEW IN</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/shop'>VIEW</Link>
        </div>
      </section>

      <section className='section' ref={refSlide4}>
        <div className='section__image section__image--c'></div>
        <div className='section__content'>
          <h1 className='section__content__title' ref={textRef}>
            SIGN UP FOR OUR NEWSLETTER
          </h1>
          <form>
            <input type='email' placeholder='Enter your email here' />
          </form>
          <Link to='/shop' className='newsletter--btn'>
            SUBSCRIBE
          </Link>
          <div className='section__icon'>
            <a
              href='https://www.instagram.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-instagram'></i>
            </a>
            <a
              href='https://www.facebook.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-facebook'></i>
            </a>
            <a
              href='https://twitter.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-twitter'></i>
            </a>
            <a
              href='https://www.pinterest.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-pinterest'></i>
            </a>
            <a
              href='https://www.youtube.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-youtube'></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
