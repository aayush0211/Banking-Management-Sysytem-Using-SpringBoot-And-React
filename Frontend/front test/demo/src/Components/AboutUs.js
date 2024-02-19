import React from 'react';
import { Container } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div className='bg_updateprofile'>

    <div style={{color:"white"}} className='p-5'>
      <h2>About Us</h2>
      <p>
        Welcome to Our Bank, a leading financial institution dedicated to providing excellent banking services to our
        customers.
      </p>
      <h3>Our History</h3>
      <p>
        Our bank was founded during the CDAC journey of Govinda Tak, Goutam Tak, Sarvesh, Parnav, and Aayush. With a
        vision to create a reliable and innovative banking solution, we embarked on this journey to serve our community
        and customers.
      </p>
      <p>
        Over the years, we have continuously evolved and adapted to meet the changing needs of our customers and the
        banking industry. Our commitment to excellence and customer satisfaction has made us a trusted name in the
        banking sector.
      </p>
      <h3>Our Mission</h3>
      <p>
        Our mission is to provide superior financial services that contribute to the growth and prosperity of our
        customers, employees, and community. We strive to deliver innovative solutions, personalized service, and
        integrity in all our interactions.
      </p>
      <h3>Our Vision</h3>
      <p>
        Our vision is to be the preferred bank of choice, recognized for our exceptional customer service, ethical
        practices, and commitment to community development. We aim to be a trusted partner in our customers' financial
        journey.
      </p>
      <h3>Core Values</h3>
      <ul style={{'listStyleType':'none'}}>
        <li>Customer-centricity</li>
        <li>Integrity and transparency</li>
        <li>Innovation and continuous improvement</li>
        <li>Teamwork and collaboration</li>
        <li>Community engagement and social responsibility</li>
      </ul>
    </div>
    </div>
  );
};

export default AboutUs;
