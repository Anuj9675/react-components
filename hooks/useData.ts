import { useRecoilState } from "recoil"
import { useEffect } from "react"
import { tableDataAtom } from "@/recoil/datbleDataAtom"
import { getLocalData, saveLocalData } from "@/lib/localStorageAPI"
import { dummyData } from "@/components/data-table/dummyData"
import type { DataRow } from "@/types/dataTableTypes"

export const useTableData = () => {
  const [data, setData] = useRecoilState(tableDataAtom)

  useEffect(() => {
    const stored = getLocalData()
    if (stored.length > 0) {
      setData(stored)
    } else {
      setData(dummyData)
      saveLocalData(dummyData)
    }
  }, [setData])

  return { data }
}

export const useSaveTableData = () => {
  const [_, setData] = useRecoilState(tableDataAtom)

  const save = (newData: DataRow[]) => {
    setData(newData)
    saveLocalData(newData)
  }

  return { save }
}
