import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopSellerData() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        setAuthor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopSellerData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton
                          width="120px"
                          height="14px"
                          borderRadius="6px"
                          margin="0px 0px 5px 0px"
                        />
                        <Skeleton
                          width="80px"
                          height="12px"
                          borderRadius="6px"
                        />
                      </div>
                    </li>
                  ))
                : author.map((item) => (
                    <li key={item.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt={item.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="author_list_info">
                        <Link to="/author">{item.authorName}</Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
