"use client"
import { DataRow } from "@/types/dataTableTypes"

const STORAGE_KEY = "table_data"

export const getLocalData = (): DataRow[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveLocalData = (data: DataRow[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  console.log("Saved data:", data)
}