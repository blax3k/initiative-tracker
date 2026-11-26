import { useState } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"
import { Row } from "./Row"

export type Combatant = {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  ac: number
}

export function App() {
  const [combatants, setCombatants] = useState<Combatant[]>([
    { id: "1234", name: "jack", initiative: 1, hp: 55, maxHp: 100, ac: 18 },
    { id: "5678", name: "ligma", initiative: 20, hp: 69, maxHp: 420, ac: 12 },
  ])

  function updateHp(id: string, hp: number) {
    setCombatants((currentCombatants) =>
      currentCombatants.map((combatant) => {
        if (combatant.id !== id) {
          return combatant
        }

        const safeHp = Number.isFinite(hp) ? hp : 0

        return {
          ...combatant,
          hp: Math.max(0, Math.min(safeHp, combatant.maxHp)),
        }
      })
    )
  }

  return (
    <div className="flex min-h-svh p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Initiative</TableHead>
            <TableHead className="w-[100px] text-center">Name</TableHead>
            <TableHead className="w-[20px] text-center">HP</TableHead>
            <TableHead className="w-[20px] text-center">AC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {combatants.map((c) => (
            <Row key={c.id} combatant={c} onHpChange={updateHp}></Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default App
