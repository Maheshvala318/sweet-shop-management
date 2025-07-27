import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFilter } from "../ContextApi/FilterContext";

const Wrapper = styled.div`
  background-color: #fff9e6;
  min-height: 100vh;

  .sidebar {
    background-color: #fef4e8;
    min-height: 100vh;
    color: #7c3f1d;
    padding: 2rem 1rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
  }

  .search-box {
    margin-bottom: 2rem;
    
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e0c9b4;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: #a64b2a;
        box-shadow: 0 0 0 2px rgba(166, 75, 42, 0.2);
      }
    }
  }

  .category-list {
    h4 {
      color: #7c3f1d;
      margin-bottom: 1.5rem;
      font-weight: 600;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 50px;
        height: 3px;
        background-color: #ff7f2a;
      }
    }
  }

  .category-button {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    margin: 0.5rem 0;
    background: none;
    border: none;
    text-align: left;
    color: #7c3f1d;
    font-size: 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      background-color: #ffecd9;
      color: #a64b2a;
      padding-left: 1.5rem;
    }
    
    &.active {
      background-color: #ff7f2a;
      color: white;
      font-weight: 500;
    }
  }

  .main-content {
    padding: 2rem;
  }

  .page-title {
    color: #7c3f1d;
    font-weight: 700;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #ffecd9;
    text-transform: capitalize;
  }

  .sweets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .sweet-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    height: 100%;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    .card-image {
      width: 100%;
      height: 220px;
      object-fit: cover;
    }
    
    .card-body {
      padding: 1.5rem;
      text-align: center;
      
      .card-title {
        color: #7c3f1d;
        font-weight: 600;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
      }
      
      .card-price {
        color: #ff7f2a;
        font-weight: 700;
        font-size: 1.1rem;
      }
    }
  }

  .no-sweets {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: #7c3f1d;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .sidebar {
      min-height: auto;
      position: static;
      padding: 1rem;
    }
    
    .main-content {
      padding: 1rem;
    }
    
    .sweets-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
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
    <Wrapper className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 sidebar">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search sweets..."
              name="text"
              value={text}
              onChange={updateFilter}
            />
          </div>
          
          <div className="category-list">
            <h4>Categories</h4>
            {categories.map((v, i) => (
              <button
                key={i}
                name="category"
                value={v}
                onClick={updateFilter}
                className={`category-button ${category === v ? 'active' : ''}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 main-content">
          <h2 className="page-title">
            {category === "All" ? "All Sweets" : `${category} Sweets`}
          </h2>
          
          <div className="sweets-grid">
            {filterSweets && filterSweets.length > 0 ? (
              filterSweets.map((sweet) => (
                <Link
                  to={`/sweet/${sweet.id}`}
                  key={sweet.id}
                  className="text-decoration-none"
                >
                  <div className="sweet-card">
                    <img
                      src={sweet.image}
                      className="card-image"
                      alt={sweet.name}
                    />
                    <div className="card-body">
                      <h3 className="card-title">{sweet.name}</h3>
                      <p className="card-price">₹{sweet.price}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-sweets">
                <p>No sweets found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}