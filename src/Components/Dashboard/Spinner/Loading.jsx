import './loading.css'

export default function Loading(props) {

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    width: ' 17px',
    height: '17px',
    backgroundColor: 'transparent',
    marginLeft: '7px',
  }

  const SpinStyle = {
    width: '100%',
    height: '100%',
    border: '2px solid white',
    borderLeftColor: '#3a8dfa',

  }

  return (
    <div className='spin-container' style={props.btnStyle && containerStyle}>
      <div className='spin' style={props.btnStyle && SpinStyle}></div>
    </div>
  )
}

