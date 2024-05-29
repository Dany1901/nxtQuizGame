import {useState} from 'react'
import './index.css'

const Options = props => {
  const {
    optionDetails,
    isCorrectss,
    getIsCorrect,
    isTrue,
    getButtonStatus,
    isCorrectClicked,
    isWrongClicked,
  } = props
  const [Img, setImg] = useState(null)

  const {text} = optionDetails
  const writeImg =
    'https://res.cloudinary.com/dedvz7flb/image/upload/v1713589945/check-circle.1_1_kmxffz.png'
  const wrongImg =
    'https://res.cloudinary.com/dedvz7flb/image/upload/v1713590097/Shape_dj2cgw.png'
  const a = (e, isCorrect, id, option) => {
    console.log(option)
    getIsCorrect(isCorrectss)
    getButtonStatus(true)
    // e.target.classList.add('selected-option')
    if (isCorrect === 'true') {
      e.target.classList.add('correct')
      setImg(writeImg)
      isCorrectClicked(isCorrect)
      // console.log(correctAns, 'Hii', isCorrect)
      //   console.log(isTrue, wrong, isCorrectss)
    } else {
      e.target.classList.add('wrong')
      setImg(wrongImg)
      isWrongClicked(isCorrect)
    }
  }

  return (
    <li className="li-el">
      <button
        type="button"
        onClick={e => a(e, optionDetails.is_correct, optionDetails.id)}
        className="option-btn"
      >
        {text}
      </button>
      <img src={Img} />
    </li>
  )
}
export default Options
