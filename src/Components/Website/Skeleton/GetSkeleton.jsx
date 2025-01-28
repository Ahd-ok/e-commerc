import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function GetSkeleton(props) {
  const skeletons = Array.from({ length: props.length }).map((_, index) => (
    <div key={index} className={props.classes}>
      <div className='mx-1'>
        <Skeleton width={props.width} baseColor={'#ddd'} height={props.height} />
      </div>
    </div >
  ))
  return (skeletons)
}
