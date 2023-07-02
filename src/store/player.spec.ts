import { describe, it, expect, beforeEach } from 'vitest'
import { usePlayerStore as playerStore } from './player'

const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: 'Iniciando com React',
      lessons: [
        { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
        { id: 'Pj8dPeameYo', title: 'CSS Global', duration: '03:23' },
      ],
    },
    {
      id: 2,
      title: 'Estrutura da aplicação',
      lessons: [
        { id: 'gE48FQXRZ_o', title: 'Estados', duration: '13:45' },
        { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
      ],
    },
  ],
}

const initialState = {
  course: null,
  activeModuleIndex: 0,
  activeLessonIndex: 0,
  isLoading: true,
}

describe('player store', () => {
  beforeEach(() => {
    playerStore.setState(initialState)
  })

  it('should be able to play', () => {
    const { play } = playerStore.getState()

    play([1, 2])

    const { activeModuleIndex, activeLessonIndex } = playerStore.getState()

    expect(activeModuleIndex).toEqual(1)
    expect(activeLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    playerStore.setState({ course })

    const { next } = playerStore.getState()

    next()

    const { activeModuleIndex, activeLessonIndex } = playerStore.getState()

    expect(activeModuleIndex).toEqual(0)
    expect(activeLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    playerStore.setState({ course })

    const { next } = playerStore.getState()

    playerStore.setState({
      activeLessonIndex: 1,
    })

    next()

    const { activeModuleIndex, activeLessonIndex } = playerStore.getState()

    expect(activeModuleIndex).toEqual(1)
    expect(activeLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is no lesson available', () => {
    playerStore.setState({ course })

    const { next } = playerStore.getState()

    playerStore.setState({
      activeModuleIndex: 1,
      activeLessonIndex: 1,
    })

    next()

    const { activeModuleIndex, activeLessonIndex } = playerStore.getState()

    expect(activeModuleIndex).toEqual(1)
    expect(activeLessonIndex).toEqual(1)
  })
})
