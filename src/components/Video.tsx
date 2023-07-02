import ReactPlayer from 'react-player'
import { LucideLoader } from 'lucide-react'

import {
  useCurrentLesson,
  useCurrentLessonLoading,
  usePlayerStore,
} from '../store/player'

export function Video() {
  const { currentLesson } = useCurrentLesson()
  const isCurrentLessonLoading = useCurrentLessonLoading()

  const { next } = usePlayerStore((store) => {
    return {
      next: store.next,
    }
  })

  function handlePlayNextLesson() {
    next()
  }

  return (
    <div className="aspect-video w-full bg-zinc-950">
      {isCurrentLessonLoading ? (
        <div className="flex h-full items-center justify-center">
          <LucideLoader className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          playing
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handlePlayNextLesson}
        />
      )}
    </div>
  )
}
