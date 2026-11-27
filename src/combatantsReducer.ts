import { setHp, setInitiative, type Combatant } from "./Combatant"

export const CombatantActionType = {
  setHP: "setHp",
  setInitiative: "setInitiative",
  setName: "setName",
  add: "add",
  remove: "remove",
} as const

export type CombatantActionType =
  (typeof CombatantActionType)[keyof typeof CombatantActionType]

type ActionCreators = typeof combatantActions
export type CombatantAction = ReturnType<ActionCreators[keyof ActionCreators]>

export const combatantActions = {
  setHp: (id: string, hp: number) =>
    ({ type: CombatantActionType.setHP, id, hp }) as const,
  setInitiative: (id: string, initiative: number) =>
    ({ type: CombatantActionType.setInitiative, id, initiative }) as const,
  setName: (id: string, name: string) =>
    ({ type: CombatantActionType.setName, id, name }) as const,
  add: (combatant: Combatant) =>
    ({ type: CombatantActionType.add, combatant }) as const,
  remove: (id: string) => ({ type: CombatantActionType.remove, id }) as const,
}

function updateById(
  state: Combatant[],
  id: string,
  fn: (c: Combatant) => Combatant
): Combatant[] {
  const i = state.findIndex((c) => c.id === id)
  if (i === -1) return state

  const updated = fn(state[i])
  if (updated === state[i]) return state

  const next = state.slice()
  next[i] = updated
  return next
}

function assertNever(x: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(x)}`)
}

export function combatantsReducer(
  state: Combatant[],
  action: CombatantAction
): Combatant[] {
  switch (action.type) {
    case CombatantActionType.setHP:
      return updateById(state, action.id, (c) => setHp(c, action.hp))
    case CombatantActionType.setInitiative:
      return updateById(state, action.id, (c) =>
        setInitiative(c, action.initiative)
      )
    case CombatantActionType.setName:
      return updateById(state, action.id, (c) =>
        c.name === action.name ? c : { ...c, name: action.name }
      )
    case CombatantActionType.add:
      return [...state, action.combatant]
    case CombatantActionType.remove:
      return state.some((c) => c.id === action.id)
        ? state.filter((c) => c.id !== action.id)
        : state
    default:
      return assertNever(action)
  }
}
