// hooks/useData.ts
import { useRecoilState } from "recoil"

import { useEffect } from "react"
import { getLocalData, saveLocalData } from "@/lib/localStorageAPI"
import { tableDataAtom } from "@/recoil/datbleDataAtom"

export const useTableData = () => {
  const [data, setData] = useRecoilState(tableDataAtom)

  useEffect(() => {
    const stored = getLocalData()
    setData(stored)
  }, [setData])

  return { data }
}

export const useSaveTableData = () => {
  const [data, setData] = useRecoilState(tableDataAtom)

  const save = (newData: typeof data) => {
    setData(newData)
    saveLocalData(newData)
  }

  return { save }
}
