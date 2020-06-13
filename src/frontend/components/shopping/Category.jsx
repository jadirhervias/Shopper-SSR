/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from 'react';
import SubCategory from './SubCategory';

const Category = ({ id, name, sub_categories }) => {
  return (
    <>
      <div className="card-body" id={`heading${id}`}>
        <h2 className="mb-0">
          <button
            className="btn"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${id}`}
            aria-expanded="true"
            aria-controls={`collapse${id}`}
          >
            {name}
          </button>
        </h2>
      </div>

      <div
        id={`collapse${id}`}
        className="collapse"
        aria-labelledby={`heading${id}`}
        data-parent="#accordionCategories"
      >
        {/* Sub-ategories list*/}
        <div className="card-body">
          {sub_categories && sub_categories.length > 0 ? (
            sub_categories.map((subCategory) => (
              <SubCategory key={subCategory.id} {...subCategory} />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
