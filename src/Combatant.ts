export type Combatant = {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  ac: number
}

export function setHp(c: Combatant, hp: number): Combatant {
  const safe = Number.isFinite(hp) ? hp : 0
  return { ...c, hp: Math.max(0, Math.min(safe, c.maxHp)) }
}
