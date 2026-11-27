import { useCallback, useReducer } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"
import { Row } from "./Row"
import { type Combatant } from "./Combatant"
import { CombatantActionType, combatantsReducer } from "./combatantsReducer"

export function App() {
  const initialCombatants: Combatant[] = [
    { id: "1234", name: "jack", initiative: 1, hp: 55, maxHp: 100, ac: 18 },
    { id: "5678", name: "ligma", initiative: 20, hp: 69, maxHp: 420, ac: 12 },
  ]

  const [combatants, dispatch] = useReducer(
    combatantsReducer,
    initialCombatants
  )

  const onHpChange = useCallback(
    (id: string, hp: number) =>
      dispatch({ type: CombatantActionType.setHP, id, hp }),
    []
  )

  const onInitiativeChange = useCallback(
    (id: string, initiative: number) =>
      dispatch({ type: CombatantActionType.setInitiative, id, initiative }),
    []
  )

  const onNameChange = useCallback(
    (id: string, name: string) =>
      dispatch({ type: CombatantActionType.setName, id, name }),
    []
  )

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
            <Row
              key={c.id}
              combatant={c}
              onHpChange={onHpChange}
              onInitiativeChange={onInitiativeChange}
              onNameChange={onNameChange}
            ></Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default App
