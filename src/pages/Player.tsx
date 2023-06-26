import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MessageCircle } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'

import { useAppSelector } from '../store'
import { useCurrentLesson, playerActions } from '../store/slices/player'

import { api } from '../lib/axios'

import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'

export function Player() {
  const dispatch = useDispatch()

  const modules = useAppSelector((state) => {
    return state.player.course?.modules
  })

  const currentModuleIndex = useAppSelector((state) => {
    return state.player.activeModuleIndex
  })

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    api.get('/courses/1').then((response) => {
      dispatch(playerActions.start(response.data))
    })
  }, [])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 font-sans text-zinc-50">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-600">
            <MessageCircle className="h-4 w-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 pr-80 shadow">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute bottom-0 right-0 top-0 w-80 overflow-y-auto border-l border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-700">
            <Accordion.Root
              type="single"
              defaultValue={`module-${currentModuleIndex}`}
              collapsible
              className="divide-y-2 divide-zinc-900"
            >
              {!!modules &&
                modules.map((module, index) => {
                  return (
                    <Module
                      key={module.id}
                      moduleIndex={index}
                      title={module.title}
                      amountOfLessons={module.lessons.length}
                    />
                  )
                })}
            </Accordion.Root>
          </aside>
        </main>
      </div>
    </div>
  )
}
