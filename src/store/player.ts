import { create } from 'zustand'

import { api } from '../lib/axios'

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null
  activeModuleIndex: number
  activeLessonIndex: number
  isLoading: boolean

  load: () => Promise<void>
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    activeModuleIndex: 0,
    activeLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true })

      const response = await api.get('/courses/1')

      set({
        course: response.data,
        isLoading: false,
      })
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex

      set({
        activeModuleIndex: moduleIndex,
        activeLessonIndex: lessonIndex,
      })
    },

    next: () => {
      const { course, activeModuleIndex, activeLessonIndex } = get()

      const currentModule = course?.modules[activeModuleIndex]

      const nextLessonIndex = activeLessonIndex + 1
      const nextLesson = currentModule?.lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          activeLessonIndex: nextLessonIndex,
        })

        return
      }

      const nextModuleIndex = activeModuleIndex + 1
      const nextModule = course?.modules[nextModuleIndex]

      if (nextModule) {
        set({
          activeModuleIndex: nextModuleIndex,
          activeLessonIndex: 0,
        })
      }
    },
  }
})

export const useCurrentLesson = () =>
  usePlayerStore((store) => {
    const { activeModuleIndex, activeLessonIndex, course } = store

    const currentModule = course?.modules[activeModuleIndex]
    const currentLesson = currentModule?.lessons[activeLessonIndex]

    return { currentModule, currentLesson }
  })

export const useCurrentLessonLoading = () =>
  usePlayerStore((store) => {
    const { isLoading } = store

    return isLoading
  })
