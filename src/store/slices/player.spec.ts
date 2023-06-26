import { describe, it, expect } from 'vitest'

import { PlayerState, playerActions, playerReducer as reducer } from './player'

const exampleState: PlayerState = {
  course: {
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
  },
  activeModuleIndex: 0,
  activeLessonIndex: 0,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, playerActions.play([1, 2]))

    expect(state.activeModuleIndex).toEqual(1)
    expect(state.activeLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, playerActions.next())

    expect(state.activeModuleIndex).toEqual(0)
    expect(state.activeLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer(
      { ...exampleState, activeLessonIndex: 1 },
      playerActions.next(),
    )

    expect(state.activeModuleIndex).toEqual(1)
    expect(state.activeLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is no lesson available', () => {
    const state = reducer(
      {
        ...exampleState,
        activeModuleIndex: 1,
        activeLessonIndex: 1,
      },
      playerActions.next(),
    )

    expect(state.activeModuleIndex).toEqual(1)
    expect(state.activeLessonIndex).toEqual(1)
  })
})
