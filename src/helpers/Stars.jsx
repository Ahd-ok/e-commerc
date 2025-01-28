import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import React from 'react'

export default function Stars(props) {
  const round = Math.round(props)
  const stars = Math.min(round);
  const shoWGoldStars = Array.from({ length: stars }).map((_, index) =>
    <FontAwesomeIcon className='text-warning' key={index} icon={faStar} />)
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) =>
    <FontAwesomeIcon className='text-warning' key={index} icon={regularStar} />)
  return (
    <div>
      {shoWGoldStars}
      {showEmptyStars}
    </div>
  )
}
