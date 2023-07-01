import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { useAppDispatch, useAppSelector } from '../store'
import { playerActions } from '../store/slices/player'

import { Lesson } from './Lesson'

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const dispatch = useAppDispatch()

  const { activeModuleIndex, activeLessonIndex } = useAppSelector((state) => {
    const { activeModuleIndex, activeLessonIndex } = state.player

    return { activeModuleIndex, activeLessonIndex }
  })

  const lessons = useAppSelector((state) => {
    return state.player.course?.modules[moduleIndex].lessons
  })

  return (
    <Accordion.Item value={`module-${moduleIndex}`} className="group">
      <Accordion.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-sm text-zinc-400">
            {amountOfLessons} {amountOfLessons === 1 ? 'aula' : 'aulas'}
          </span>
        </div>

        <ChevronDown className="ml-auto h-5 w-5 text-zinc-400 transition-transform group-data-[state=open]:rotate-180" />
      </Accordion.Trigger>

      <Accordion.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {!!lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                activeModuleIndex === moduleIndex &&
                activeLessonIndex === lessonIndex

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={isCurrent}
                  onPlay={() =>
                    dispatch(playerActions.play([moduleIndex, lessonIndex]))
                  }
                />
              )
            })}
        </nav>
      </Accordion.Content>
    </Accordion.Item>
  )
}
