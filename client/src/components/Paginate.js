import React from 'react';

import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '', category }) => {
  const redirectTo = pageNum => {
    if (isAdmin) {
      return `/admin/productlist/${pageNum}`;
    }

    if (category) {
      return `/shop/category/${category}/page/${pageNum}`;
    }

    if (keyword) {
      return `/shop/search/${keyword}/page/${pageNum}`;
    }

    return `/shop/page/${pageNum}`;
  };

  return (
    pages > 1 && (
      <div className='pagination'>
        {[...Array(pages).keys()].map(x => (
          <div key={x + 1} className='pagination__item'>
            <Link to={redirectTo(x + 1)}>
              <div className={`${x + 1 === page ? 'active' : 'number'}`}>
                {x + 1}
              </div>
            </Link>
          </div>
        ))}
      </div>
    )
  );
};

export default Paginate;
