import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import "./HotCollections/HotCollections.css";
import { useKeenSlider } from "keen-slider/react";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [newNft, setNewNft] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 12,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1,
          spacing: 8,
        },
      },
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [newNft, loading, instanceRef]);

  useEffect(() => {
    async function fetchNewNftData() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        );
        setNewNft(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewNftData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-wrapper">
            <button
              className="slider-btn prev"
              onClick={() =>
                instanceRef.current?.moveToIdx(
                  instanceRef.current.track.details.rel - 4,
                )
              }
            >
              ‹
            </button>
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft_coll skeleton-card">
                        <div className="nft_wrap">
                          <Skeleton
                            width="100%"
                            height="100%"
                            borderRadius="0"
                          />
                        </div>

                        <div className="nft_coll_pp">
                          <Skeleton
                            width="54px"
                            height="54px"
                            borderRadius="50%"
                          />
                        </div>

                        <div className="nft_coll_info">
                          <Skeleton
                            width="45%"
                            height="14px"
                            borderRadius="6px"
                            margin="0px 0px 5px 0px"
                            className="mx-auto"
                          />
                          <Skeleton
                            width="28%"
                            height="12px"
                            borderRadius="6px"
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : newNft.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={item.title}
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && (
                          <div className="de_countdown">
                            <Countdown expiryDate={item.expiryDate} />
                          </div>
                        )}
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <button
              className="slider-btn next"
              onClick={() =>
                instanceRef.current?.moveToIdx(
                  instanceRef.current.track.details.rel + 4,
                )
              }
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
