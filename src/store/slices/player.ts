import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '..'

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
}

const initialState: PlayerState = {
  course: null,
  activeModuleIndex: 0,
  activeLessonIndex: 0,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload
    },
    play: (state, action: PayloadAction<[number, number]>) => {
      state.activeModuleIndex = action.payload[0]
      state.activeLessonIndex = action.payload[1]
    },
    next: (state) => {
      const currentModule = state.course?.modules[state.activeModuleIndex]

      const nextLessonIndex = state.activeLessonIndex + 1
      const nextLesson = currentModule?.lessons[nextLessonIndex]

      if (nextLesson) {
        state.activeLessonIndex = nextLessonIndex
        return
      }

      const nextModuleIndex = state.activeModuleIndex + 1
      const nextModule = state.course?.modules[nextModuleIndex]

      if (nextModule) {
        state.activeModuleIndex = nextModuleIndex
        state.activeLessonIndex = 0
      }
    },
  },
})

export const playerReducer = playerSlice.reducer
export const playerActions = playerSlice.actions

export const useCurrentLesson = () =>
  useAppSelector((state) => {
    const { activeModuleIndex, activeLessonIndex } = state.player

    const currentModule = state.player.course?.modules[activeModuleIndex]
    const currentLesson = currentModule?.lessons[activeLessonIndex]

    return { currentModule, currentLesson }
  })
