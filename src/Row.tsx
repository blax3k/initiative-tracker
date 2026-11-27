import type { Combatant } from "./Combatant"
import { Input } from "./components/ui/input"
import { TableCell, TableRow } from "./components/ui/table"

type RowProps = {
  combatant: Combatant
  onHpChange: (id: string, hp: number) => void
  onInitiativeChange: (id: string, initiative: number) => void
  onNameChange: (id: string, name: string) => void
}

export function Row({
  combatant: c,
  onHpChange,
  onNameChange,
  onInitiativeChange,
}: RowProps) {
  return (
    <TableRow>
      <TableCell>
        <Input
          value={String(c.initiative)}
          type="number"
          min={0}
          max={30}
          onChange={(event) =>
            onInitiativeChange(c.id, event.currentTarget.valueAsNumber)
          }
        />
      </TableCell>
      <TableCell>
        <Input
          value={c.name}
          onChange={(event) => onNameChange(c.id, event.currentTarget.value)}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-1">
          <Input
            className="w-16 text-center"
            type="number"
            min={0}
            max={c.maxHp}
            value={c.hp}
            onChange={(event) =>
              onHpChange(c.id, event.currentTarget.valueAsNumber)
            }
          />
          <span>/ {c.maxHp}</span>
        </div>
      </TableCell>
      <TableCell>{c.ac}</TableCell>
    </TableRow>
  )
}
