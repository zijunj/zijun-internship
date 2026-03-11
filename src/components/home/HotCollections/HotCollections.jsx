import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "./HotCollections.css";
import Skeleton from "../../UI/Skeleton";

const HotCollections = () => {
  const [nft, setNft] = useState([]);
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
  }, [nft, loading, instanceRef]);

  useEffect(() => {
    async function fetchNftData() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setNft(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNftData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
                : nft.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
                      <Link
                        to={`/item-details/`}
                        // will add item.nftId for itemdetail page
                        className="nft-link"
                      >
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <img src={item.nftImage} alt={item.title} />
                          </div>
                          <div className="nft_coll_pp">
                            <img src={item.authorImage} alt="" />
                          </div>
                          <div className="nft_coll_info">
                            <h4>{item.title}</h4>
                            <span>ERC-{item.code}</span>
                          </div>
                        </div>
                      </Link>
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

export default HotCollections;
