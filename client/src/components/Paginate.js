import React from 'react';

import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className='pagination'>
        {[...Array(pages).keys()].map(x => (
          <div key={x + 1} className='pagination__item'>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/shop/search/${keyword}/page/${x + 1}`
                    : `/shop/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
            >
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
