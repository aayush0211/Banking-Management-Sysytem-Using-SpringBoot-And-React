import React from 'react';
import 'aos/dist/aos.css';
import GoldImg from '../images/GoldLoan.png';
import homeImg from '../images/home2.jpg';
import salaryImg from '../images/salary_plus.jpg';
import stockImg from '../images/stock.jpg';
import '../Style/services.scss';
import SimpleImageSlider from "react-simple-image-slider";

const images = [
    {
      url: "https://bankofindia.co.in/documents/20121/22946267/Nationwide_AwarenessBanner.jpg/b799fcb2-4acb-1add-fb86-5a4de4d18b71?t=1691561734344",
    },
    {
      url: "https://bankofindia.co.in/documents/20121/22946267/Nationwide_awareness_poster.jpg/0cb93e55-3d62-a047-6b80-c7e4e7a50ea5?t=1691561779076",
    },
    {
      url: "https://bankofindia.co.in/documents/20121/23595469/1Akira.png/8d7ede4c-90f6-2667-f1ea-3a24d83f05d2?t=1702970410192",
    },
  ];
const servicesData = [
  {
    image: homeImg,
    title: 'STAR HOME LOAN',
    desc: `Provides loans to purchase a Plot for construction of a House...`,
    link: '/allCustomers',
    btn: 'Learn More',
  },
  {
    image: GoldImg,
    title: 'GOLD LOAN',
    desc: 'Gold Loan is the most convenient and easy way to fulfil all you...',
    link: '/moneyTransfer',
    btn: 'Learn More',
  },
  {
    image: salaryImg,
    title: 'GOVERNMENT SALARY ACCOUNT',
    desc: 'Start building a secure and prosperous future with a bankin...',
    link: '/transactions',
    btn: 'Leran More',
  },
  {
    image: stockImg,
    title: 'STAR ASSET BACKED LOAN',
    desc: '25% in NFB Commissions To provide working capital for building...',
    link: '/transactions',
    btn: 'Learn More',
  }
];

const Services = () => {
    return (
      <>
    <div className="services_cls section_padding">

      <h1 className="main-title heading">Services
      </h1>
      <h3>City Bank's Employees can perform following operation.</h3>
      <div className="services-box">


        {servicesData.map((service, index) =>
        (
          <div key={index} data-aos="zoom-in-right" data-aos-delay="0" className="card">

            <img src={service.image} alt={`${service.title} img`} />

            <div className="service-name">{service.title}</div>
            <div className="service-desc">{service.desc}</div>

            <a href={service.link}>
              <button>{service.btn}</button>
            </a>

          </div>
        ))}
      </div>
    </div>
    <div className="myslider">
        <SimpleImageSlider
          width={896}
          height={504}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
        />
      </div>
      </>
  );
};

export default Services;