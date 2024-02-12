import React from 'react';
import hero from '../assets/hero3.jpg';
import bread from '../assets/bread.jpg';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="w-screen">
      <div
        className="bg-cover bg-center pt-5"
        style={{ backgroundImage: `url(${hero})`, height: '90vh', overflow: 'hidden' }}
      >
        <div className="w-3/4 m-auto justify-center items-center h-full">
          <div className="flex flex-col items-center justify-center w-3/5 mt-32">
            <h1 className="text-white font-bold text-5xl leading-relaxed">
              Welcome to the World of Sweet Delights!
            </h1>
            <p className="text-white italic text-xl tracking-wider leading-relaxed text-justify">
              Where your culinary fantasies come to life. Immerse yourself in the world of aromatic
              and appetizing baked goods, where every bite is magically delicious. Join us to
              discover the realm of unparalleled flavors and possibilities. Sell your unique
              creations or indulge in the choice and variety offered by our talented bakers. Let's
              create something magical together!
            </p>
            <div className="flex gap-5 items-center justify-center mt-5">
              {' '}
              <Link to={'/registration'}>
                <button className="rounded-md bg-white px-3.5 py-2.5 text-md font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Get started
                </button>
              </Link>
              <a href="#leadership" className="text-md font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4 m-auto">
        <div className="py-20">
          <div className="px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Benefits of Partnering with Us
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-2xl gap-8  sm:mt-16  lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-start justify-between max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      Wide Assortment
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      We offer a variety of baked goods, from classic pies and cookies to exotic
                      desserts and gluten-free options, to cater to every taste.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-between max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      Convenience
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      With our platform, you can easily and quickly find and order your favorite
                      baked goods right from the comfort of your home, saving you time and effort.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-between max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      Quality and Uniqueness
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      Our bakers carefully select only the finest ingredients and create unique
                      recipes to ensure that each product is not only delicious but also
                      one-of-a-kind.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-between max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      Community Support
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      We support and inspire our bakers, helping them to grow and unleash their
                      talent, while also creating opportunities for networking and knowledge
                      exchange.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-cover pt-5 flex justify-end items-end !overflow-hidden"
        style={{ backgroundImage: `url(${bread})`, height: '100vh' }}
      >
        <div
          id="leadership"
          className="h-full w-3/4 m-auto flex justify-end items-end pb-16 !overflow-hidden"
        >
          <div className="">
            <div className="flex gap-12">
              <div className="w-1/3">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Meet our leadership
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim
                  vitae ullamcorper suspendisse.
                </p>
              </div>

              <ol role="list" className="flex flex-col gap-3 w-3/5  pl-5">
                <li className="text-left flex flex-row">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    1. Personalized Search
                    <span className="text-md font-thin leading-6 text-gray-900 ml-3">
                      Our platform offers convenient search options by types of baked goods,
                      ingredients, baker ratings, and more, allowing you to quickly find the perfect
                      product for you.
                    </span>
                  </h3>
                </li>
                <li className="text-left">
                  <h3 className="t-3 text-lg font-semibold leading-6 text-gray-900">
                    2. Feedback and Ratings
                    <span className="text-md font-thin leading-6 text-gray-900 ml-3">
                      We value the opinions of our customers and provide the opportunity to leave
                      reviews and ratings to help other users make the right choice.
                    </span>
                  </h3>
                </li>
                <li className="text-left">
                  <h3 className="t-3 text-lg font-semibold leading-6 text-gray-900">
                    3. Secure Payment and Delivery
                    <span className="text-md font-thin leading-6 text-gray-900 ml-3">
                      We ensure safe and convenient payment and delivery methods so you can enjoy
                      your favorite baked goods without worrying about ordering hassles.
                    </span>
                  </h3>
                </li>
                <li className="text-left">
                  <h3 className="t-3 text-lg font-semibold leading-6 text-gray-900">
                    4. Loyalty Program
                    <span className="text-md font-thin leading-6 text-gray-900 ml-3">
                      Join our loyalty program and receive special bonuses and discounts for every
                      purchase, making your partnership with us even more rewarding and enjoyable.
                    </span>
                  </h3>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
