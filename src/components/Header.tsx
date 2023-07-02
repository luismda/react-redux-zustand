import { useCurrentLesson, useCurrentLessonLoading } from '../store/player'

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson()

  const isCurrentLessonLoading = useCurrentLessonLoading()

  if (isCurrentLessonLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo &quot;{currentModule?.title}&quot;
      </span>
    </div>
  )
}
