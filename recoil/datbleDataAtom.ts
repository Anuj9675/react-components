
import { atom } from "recoil"
import type { DataRow } from "@/types/dataTableTypes"

export const tableDataAtom = atom<DataRow[]>({
  key: "tableDataAtom",
  default: [],
})
