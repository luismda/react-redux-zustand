import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useAppSelector } from '..'

import { api } from '../../lib/axios'

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
}

const initialState: PlayerState = {
  course: null,
  activeModuleIndex: 0,
  activeLessonIndex: 0,
  isLoading: true,
}

export const loadCourse = createAsyncThunk('player/load', async () => {
  const response = await api.get('/courses/1')

  return response.data
})

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
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
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    }),
      builder.addCase(loadCourse.fulfilled, (state, action) => {
        state.course = action.payload
        state.isLoading = false
      })
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

export const useCurrentLessonLoading = () =>
  useAppSelector((state) => {
    const { isLoading } = state.player

    return isLoading
  })
