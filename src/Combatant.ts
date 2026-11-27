export type Combatant = {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  ac: number
}

export const MAX_INITIATIVE = 30

export function setHp(c: Combatant, hp: number): Combatant {
  const safe = Number.isFinite(hp) ? hp : 0
  const next = Math.max(0, Math.min(safe, c.maxHp))
  return next === c.hp ? c : { ...c, hp: next }
}

export function setInitiative(c: Combatant, initiative: number): Combatant {
  const safe = Number.isFinite(initiative) ? initiative : 0
  const next = Math.max(0, Math.min(safe, MAX_INITIATIVE))
  return next === c.initiative ? c : { ...c, initiative: next }
}
