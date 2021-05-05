import React from 'react';
import s from '../Users/Users.module.css';


const Pagination = React.memo(({ totalPageCount, pageSize, currentPage, onPageChanged }) => {
    const displayCount = 4
    let pagesLength = Math.ceil(totalPageCount / pageSize)
    let pages = [];
    for (let i = 0; i < pagesLength; i++) {
        if (Math.abs((i + 1) - currentPage) <= displayCount)
            pages.push(i + 1);
    }

    let displayPages = (pages) => {
        if (pages[0] > 1) {
            pages = [1, -1, ...pages];
        }

        if (pages[pages.length - 1] < pagesLength)
            pages = [...pages, -1, pagesLength]


        let displayPages = pages.map(p => {
            let res;
            if (p < 0) {
                res = <span>...</span>
            }
            else {
                res = <span className={currentPage === p ? s.selectedPage : s.pages}
                    onClick={() => { onPageChanged(p) }}>
                    {p}
                </span>
            }
            return res;
        })

        return displayPages;
    }

    return (
        <div>
            {
                displayPages(pages)
            }
        </div>);
});

export default Pagination;