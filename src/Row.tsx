import type { Combatant } from "./App"
import { Input } from "./components/ui/input"
import { TableCell, TableRow } from "./components/ui/table"

type RowProps = {
  combatant: Combatant
}

export function Row({ combatant: c }: RowProps) {
  return (
    <TableRow>
      <TableCell>
        <Input value={String(c.initiative)} />
      </TableCell>
      <TableCell>
        <Input value={c.name} />
      </TableCell>
      <TableCell>{`${c.hp}/${c.maxHp}`}</TableCell>
      <TableCell>{c.ac}</TableCell>
    </TableRow>
  )
}
