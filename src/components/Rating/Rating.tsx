import React, { SyntheticEvent } from 'react'

interface StarProps {
  starId: any
  marked: any
}

interface RatingProps {
  stars: number
  setStars?: any
  disabled?: boolean
}

const Star: React.FC<StarProps> = ({ starId, marked }) => (
  <span star-id={starId} role='button' style={{ color: '#FFD700', cursor: 'pointer' }}>
    {marked ? '\u2605' : '\u2606'}
  </span>
)

const Rating: React.FC<RatingProps> = ({ stars, setStars, disabled = false }) => {
  const [selection, setSelection] = React.useState(0)
  const [rating, setRating] = React.useState(stars)

  const hoverOver = (event: any) => {
    let starId = 0
    if (event && event.target && event.target.getAttribute('star-id')) {
      starId = event.target.getAttribute('star-id')
    }
    setSelection(starId)
  }

  const ratingEvents = {
    onMouseOver: hoverOver,
    onMouseOut: () => hoverOver(null),

    onClick: (event: SyntheticEvent) => {
      const rate = Number((event.target as HTMLInputElement).getAttribute('star-id')) || 0
      setRating(rate)
      console.log('hola')
      setStars(rate)
    },
  }

  return (
    <div {...(disabled ? {} : ratingEvents)}>
      {Array.from({ length: 5 }, (v, i) => (
        <Star key={i + 1} starId={i + 1} marked={selection ? selection > i : rating > i} />
      ))}
    </div>
  )
}

export default Rating
