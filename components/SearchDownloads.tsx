import React, { useState } from 'react'

import { DownloadsType } from '../pages/resources'

type SearchType = {
  original: DownloadsType[]
  setFiltered: Function
}

const SearchDownloads = ({ original, setFiltered }: SearchType) => {
  const [query, setQuery] = useState('')
  const handleChange = (e: any) => {
    // const results = posts.filter(post => {
    //     if (e.target.value === "") return posts
    //     return post.title.toLowerCase().includes(e.target.value.toLowerCase())
    // });
    setQuery(e.target.value)
  }
  const search = () => {
    // RESET FILTERED LIST
    if (query === '') {
      setFiltered(original)
      return
    }
    let newList = [] as object[]
    original.forEach((obj) => {
      // FILTER BY CATEGORY NAME
      // if (obj.category.includes(query)) return obj;
      const filteredFiles = obj.files.filter(({ linkName }) =>
        linkName.toLowerCase().includes(query.toLowerCase())
      )
      if (filteredFiles.length > 0) {
        newList.push({ category: obj.category, files: filteredFiles })
      }
    })
    setFiltered(newList)
  }
  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="input-group relative flex w-full items-stretch">
          <input
            type="search"
            className="downloads__search--input"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={handleChange}
          />
          <button
            className="downloads__search--button"
            type="button"
            id="button-addon2"
            onClick={search}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchDownloads
