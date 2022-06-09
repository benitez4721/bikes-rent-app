import React, { SyntheticEvent } from 'react'
import { useAuth } from '../../context/AuthContext/AuthProvider'

interface StarProps {
  starId: any
  marked: any
}

interface RatingProps {
  stars: number
  setStars?: any
  disabled?: boolean
  forceEnable?: boolean
}

const Star: React.FC<StarProps> = ({ starId, marked }) => (
  <span star-id={starId} role='button' style={{ color: '#FFD700', cursor: 'pointer' }}>
    {marked ? '\u2605' : '\u2606'}
  </span>
)

const Rating: React.FC<RatingProps> = ({
  stars,
  setStars,
  disabled = false,
  forceEnable = false,
}) => {
  const [selection, setSelection] = React.useState(0)
  const { isAdmin } = useAuth()

  const hoverOver = (event: any) => {
    let starId = 0
    if (event && event.target && event.target.getAttribute('star-id')) {
      starId = event.target.getAttribute('star-id')
    }
    setSelection(starId)
  }

  const getRatingEvents = () => {
    const ratingEvents = {
      onMouseOver: hoverOver,
      onMouseOut: () => hoverOver(null),

      onClick: (event: SyntheticEvent) => {
        const rate = Number((event.target as HTMLInputElement).getAttribute('star-id')) || 0
        if (rate > 0) {
          setStars(rate)
        }
      },
    }
    if (forceEnable) {
      return ratingEvents
    }
    if (disabled || isAdmin) {
      return {}
    }

    return ratingEvents
  }

  return (
    <div {...getRatingEvents()}>
      {Array.from({ length: 5 }, (v, i) => (
        <Star key={i + 1} starId={i + 1} marked={selection ? selection > i : stars > i} />
      ))}
    </div>
  )
}

export default Rating
