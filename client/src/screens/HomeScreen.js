import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import video from '../images/showcase.mp4';

const HomeScreen = () => {
  return (
    <>
      <Meta />
      <section className='section showcase'>
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

      <section className='section'>
        <div className='section__image section__image--a'></div>
        <div className='section__content section__content--a'>
          <h1 className='section__content__title'>NEW IN</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/shop'>VIEW</Link>
        </div>
      </section>

      <section className='section'>
        <div className='section__image section__image--b'></div>
        <div className='section__content section__content--b'>
          <h1 className='section__content__title'>NEW IN</h1>
          <h3>
            Explore this week's latest collection of the season curated for you
          </h3>
          <Link to='/shop'>VIEW</Link>
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
