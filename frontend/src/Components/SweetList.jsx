import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFilter } from "../ContextApi/FilterContext";

const Wrapper = styled.div`
  .search-box input {
    padding: 8px;
    width: 80%;
    margin: 10px auto;
    border-radius: 6px;
    border: none;
    outline: none;
  }

  .sidebar {
    background-color: #fef4e8;
    min-height: 100vh;
    color: #7C3F1D;
    padding-top: 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.05);
  }

  .category-button {
    background: none;
    border: none;
    color: #7C3F1D;
    padding: 6px 10px;
    margin: 4px 0;
    font-size: 15px;
    text-align: left;
    width: 100%;
    transition: all 0.2s ease;
    border-radius: 6px;
  }

  .category-button:hover {
    background-color: #ffecd9;
    color: #A64B2A;
    font-weight: 500;
    padding-left: 14px;
  }

  .main {
    padding: 30px;
    background-color: #fff9e6;
  }

  .heading {
    color: #7C3F1D;
    font-weight: bold;
  }

  .card {
    width: 18rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }

  .card-title {
    color: #7C3F1D;
  }

  .card-body p {
    color: #FF7F2A;
    font-weight: bold;
  }
`;

export default function SweetList() {
  const {
    filterSweets,
    allSweets,
    filters: { text, category },
    updateFilter,
  } = useFilter();

  const getCategories = (data, property) => {
    const values = data.map((item) => item[property]);
    return ["All", ...new Set(values)];
  };

  const categories = getCategories(allSweets, "category");

  return (
    <Wrapper className="container-fluid">
      <div className="row mb-0">
        {/* Sidebar */}
        <div className="col-12 col-md-2 text-center sidebar">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search"
              name="text"
              value={text}
              onChange={updateFilter}
            />
          </div>
          <h4 className="mt-4">Categories</h4>
          <div className="d-flex flex-column align-items-center">
            {categories.map((v, i) => (
              <button
                key={i}
                name="category"
                value={v}
                onClick={updateFilter}
                className="category-button"
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-10 main">
          <div className="text-center mb-4">
            <h3 className="heading shadow p-2 border-bottom rounded">
              {category} Sweets
            </h3>
          </div>

          <div className="d-flex justify-content-start flex-wrap gap-4">
            {filterSweets && filterSweets.length > 0 ? (
              filterSweets.map((sweet) => (
                <Link
                  to={`/sweet/${sweet.id}`}
                  key={sweet.id}
                  className="text-decoration-none"
                >
                  <div className="card shadow">
                    <img
                      src={sweet.image}
                      className="card-img-top"
                      alt={sweet.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{sweet.name}</h5>
                      <p>₹{sweet.price}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center">No sweets found.</p>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
