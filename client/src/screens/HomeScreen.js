import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import video from '../images/showcase.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faPinterest,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomeScreen = () => {
  const [email, setEmail] = useState('');

  const refSlide1 = useRef(null);
  const refSlide2 = useRef(null);
  const refSlide3 = useRef(null);
  const refSlide4 = useRef(null);
  const revealRef1 = useRef(null);
  const revealRef2 = useRef(null);
  const revealRef3 = useRef(null);

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
  }, []);

  useEffect(() => {
    const texts = [revealRef1, revealRef2, revealRef3].map(ref => ref.current);

    gsap.from(refSlide1.current, {
      duration: 1,
      autoAlpha: 0,
      ease: 'none',
      delay: 0.7,
    });

    texts.forEach(el => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    if (!email === '') {
      alert('Thank you for your subsciption!');
    } else {
      alert('ERR! Please enter valid email address.');
    }
  };

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
        <div className='section__content' ref={revealRef1}>
          <h1 className='section__content__title'>NEW IN</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/shop'>VIEW</Link>
        </div>
      </section>

      <section className='section' ref={refSlide3}>
        <div className='section__image section__image--b'></div>
        <div className='section__content' ref={revealRef2}>
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
          <h1 className='section__content__title' ref={revealRef3}>
            SIGN UP FOR OUR NEWSLETTER
          </h1>
          <form onSubmit={submitHandler}>
            <input
              type='email'
              placeholder='Enter your email here'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div>
              <button className='newsletter--btn'>SUBSCRIBE</button>
            </div>
          </form>

          <div className='section__icon__container'>
            <a
              href='https://www.instagram.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href='https://www.facebook.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href='https://twitter.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href='https://www.pinterest.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faPinterest} />
            </a>
            <a
              href='https://www.youtube.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
          <p>Copyright &copy; MOMO | All rights reserved. | MINJI LEE</p>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
