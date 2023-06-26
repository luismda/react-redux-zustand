import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'

import { playerActions, useCurrentLesson } from '../store/slices/player'

export function Video() {
  const dispatch = useDispatch()
  const { currentLesson } = useCurrentLesson()

  function handlePlayNextLesson() {
    dispatch(playerActions.next())
  }

  if (!currentLesson) {
    return null
  }

  return (
    <div className="aspect-video w-full bg-zinc-950">
      <ReactPlayer
        width="100%"
        height="100%"
        playing
        controls
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        onEnded={handlePlayNextLesson}
      />
    </div>
  )
}
