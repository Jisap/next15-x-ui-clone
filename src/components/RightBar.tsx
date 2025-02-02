import React from 'react'
import Link from "next/link";
import Search from './Search'
import PopularTags from './PopularTags'
import Recomendations from './Recomendations'

const RightBar = () => {
  return (
    <div>
      <Search />
      <PopularTags />
      <Recomendations />
      <div className="text-textGray text-sm flex gap-x-4 flex-wrap">
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Cookie Policy</Link>
        <Link href="/">Accessibility</Link>
        <Link href="/">Ads Info</Link>
        <span>© 2025 J Corp.</span>
      </div>
    </div>
  )
}

export default RightBar