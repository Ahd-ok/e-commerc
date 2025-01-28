import { useEffect, useState } from 'react'

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);
  useEffect(() => {
    if (props.setCount) {
      props.setCount(btn);
    }

    if (props.changeCount) {
      props.changeCount(props.id, btn)
    }
  }, [btn]);

  useEffect(() => {
    if (props.count) {
      props.count <= props.stock ? setBtn(props.count) : setBtn(props.stock)
    }
  }, [props.count])

  return (
    <div className='bg-primary btn px-0 py-1 text-white d-flex align-items-center justify-content-center column-gap-3 fw-bold'>
      <span style={{ borderRight: '1px solid white' }}
        className='px-3'
        onClick={
          (e) => {
            if (btn > 0) {
              setBtn((prev) => --prev);
            } else {
              setBtn(0)
            }
          }
        }>
        -
      </span>
      <span>{btn}</span>
      <span
        style={{ borderLeft: '1px solid white' }}
        className='px-3'
        onClick={(e) => {
          if (btn >= 0) {
            setBtn((prev) => ++prev)
          }
        }}>
        +
      </span>
    </div>
  )
}
