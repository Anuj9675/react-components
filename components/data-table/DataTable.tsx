"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DataTableHeader } from "./DataTableHeader"
import { Edit2, Save, X, Trash2, Plus, GripVertical } from "lucide-react"
import type { DataTableProps, DataRow } from "@/types/dataTableTypes"
import { Card, CardContent } from "./card"

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [filterTextName, setFilterTextName] = useState("")
  const [filterTextAge, setFilterTextAge] = useState("")
  const [filterTextCity, setFilterTextCity] = useState("")
  const [filterTextDate, setFilterTextDate] = useState("")
  const [filterTextTime, setFilterTextTime] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [rows, setRows] = useState<DataRow[]>(data)
  const [editingRowId, setEditingRowId] = useState<number | null>(null)
  const [newRow, setNewRow] = useState<DataRow | null>(null)
  const [draggedRowId, setDraggedRowId] = useState<number | null>(null)
  const [dragOverRowId, setDragOverRowId] = useState<number | null>(null)

  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | undefined>(undefined)

  const showAlert = (message: string, type: "success" | "error" = "success") => {
    setAlert({ message, type })
    setTimeout(() => setAlert(undefined), 3000)
  }

  const columns = ["id", "name", "age", "city", "date", "time"]

  const handleSortChange = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleAddClick = () => {
    const newRowData: DataRow = {
      id: rows.length + 1,
      name: "",
      age: "",
      city: "",
      date: "",
      time: "",
    }
    setNewRow(newRowData)
    setEditingRowId(newRowData.id)
  }

  const handleEditSaveClick = () => {
    if (editingRowId !== null && newRow) {
      const existingIndex = rows.findIndex((r) => r.id === newRow.id)
      const updatedRows =
        existingIndex >= 0
          ? rows.map((r, i) => (i === existingIndex ? newRow : r))
          : [...rows, newRow]

      const resequenced = updatedRows.map((row, index) => ({ ...row, id: index + 1 }))
      setRows(resequenced)
      setEditingRowId(null)
      setNewRow(null)
      showAlert(existingIndex >= 0 ? "Record updated successfully!" : "New record added.")
    }
  }

  const handleCancelClick = () => {
    setEditingRowId(null)
    setNewRow(null)
  }

  const handleEditClick = (rowId: number) => {
    setEditingRowId(rowId)
    const rowToEdit = rows.find((row) => row.id === rowId)
    if (rowToEdit) setNewRow({ ...rowToEdit })
  }

  const handleDeleteClick = (rowId: number) => {
    const updated = rows.filter((row) => row.id !== rowId)
    const resequenced = updated.map((row, index) => ({ ...row, id: index + 1 }))
    setRows(resequenced)
    if (editingRowId === rowId) {
      setEditingRowId(null)
      setNewRow(null)
    }
    showAlert("Record deleted successfully.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (newRow) {
      setNewRow((prev) => (prev ? { ...prev, [name]: value } : null))
    }
  }

  const handleDragStart = (e: React.DragEvent, rowId: number) => {
    setDraggedRowId(rowId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", "")
  }

  const handleDragOver = (e: React.DragEvent, rowId: number) => {
    e.preventDefault()
    setDragOverRowId(rowId)
  }

  const handleDrop = (e: React.DragEvent, dropRowId: number) => {
    e.preventDefault()
    if (draggedRowId === null || draggedRowId === dropRowId) return

    const draggedIndex = rows.findIndex((row) => row.id === draggedRowId)
    const dropIndex = rows.findIndex((row) => row.id === dropRowId)

    const updated = [...rows]
    const [draggedRow] = updated.splice(draggedIndex, 1)
    updated.splice(dropIndex, 0, draggedRow)

    const resequenced = updated.map((row, index) => ({ ...row, id: index + 1 }))
    setRows(resequenced)
    setDraggedRowId(null)
    setDragOverRowId(null)
  }

  const filterData = (row: DataRow) => {
    return (
      (row.name.toLowerCase().includes(filterTextName.toLowerCase()) || !filterTextName) &&
      (row.age.toString().includes(filterTextAge) || !filterTextAge) &&
      (row.city.toLowerCase().includes(filterTextCity.toLowerCase()) || !filterTextCity) &&
      (row.date.toLowerCase().includes(filterTextDate.toLowerCase()) || !filterTextDate) &&
      (row.time.toLowerCase().includes(filterTextTime.toLowerCase()) || !filterTextTime)
    )
  }

  const filteredData = rows.filter(filterData)
  const sortedData = [...filteredData]
  if (newRow && !rows.find((r) => r.id === newRow.id)) sortedData.unshift(newRow)

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 pt-4 px-4">
      <div className="mx-auto">
        <Card className="shadow-2xl border-0">

          <DataTableHeader
            filterTextName={filterTextName}
            filterTextAge={filterTextAge}
            filterTextCity={filterTextCity}
            filterTextDate={filterTextDate}
            filterTextTime={filterTextTime}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onFilterChangeName={setFilterTextName}
            onFilterChangeAge={setFilterTextAge}
            onFilterChangeCity={setFilterTextCity}
            onFilterChangeDate={setFilterTextDate}
            onFilterChangeTime={setFilterTextTime}
            onSortChange={handleSortChange}
            columns={columns}
            onAddClick={handleAddClick}
            alert={alert}
          />

          {/* Desktop Table */}
          <div className="max-h-[70vh] overflow-y-auto hidden md:block">
            <div className="grid grid-cols-8 py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-700">
              <div className="text-center">Drag</div>
              {columns.map((col) => (
                <div key={col} className="text-center cursor-pointer" onClick={() => handleSortChange(col)}>
                  {col.toUpperCase()}
                </div>
              ))}
              <div className="text-center">Actions</div>
            </div>

            {sortedData.map((row, index) => (
              <div
                key={`row-${row.id}-${index}`}
                draggable={editingRowId !== row.id}
                onDragStart={(e) => handleDragStart(e, row.id)}
                onDragOver={(e) => handleDragOver(e, row.id)}
                onDrop={(e) => handleDrop(e, row.id)}
                className="grid grid-cols-8 py-2 px-4 border-b bg-white hover:bg-gray-50"
              >
                <div className="flex justify-center items-center">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                </div>
                {columns.map((col) => (
                  <div key={col} className="flex justify-center items-center text-sm">
                    {col === "id" ? (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        #{row.id.toString().padStart(3, "0")}
                      </span>
                    ) : newRow?.id === row.id && editingRowId === row.id ? (
                      <input
                        name={col}
                        value={newRow[col as keyof DataRow]}
                        onChange={handleChange}
                        className="w-full px-2 py-1 text-xs border text-center"
                      />
                    ) : (
                      <span>{row[col as keyof DataRow]}</span>
                    )}
                  </div>
                ))}
                <div className="flex justify-center items-center gap-1">
                  {newRow?.id === row.id && editingRowId === row.id ? (
                    <>
                      <button onClick={handleEditSaveClick} className="p-1 bg-green-600 text-white rounded">
                        <Save className="h-4 w-4" />
                      </button>
                      <button onClick={handleCancelClick} className="p-1 bg-gray-600 text-white rounded">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(row.id)} className="p-1 bg-blue-600 text-white rounded">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteClick(row.id)} className="p-1 bg-red-600 text-white rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4 space-y-4">
            {sortedData.map((row) => {
              const isEditing = newRow?.id === row.id && editingRowId === row.id
              return (
                <Card key={row.id}>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">#{row.id.toString().padStart(3, "0")}</span>
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <button onClick={handleEditSaveClick} className="text-green-600">
                              <Save className="h-4 w-4" />
                            </button>
                            <button onClick={handleCancelClick} className="text-gray-600">
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(row.id)} className="text-blue-600">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDeleteClick(row.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {columns.slice(1).map((col) => (
                      <div key={col} className="flex justify-between text-sm items-center">
                        <span className="text-gray-600 capitalize">{col}</span>
                        {isEditing ? (
                          <input
                            name={col}
                            value={newRow?.[col as keyof DataRow] || ""}
                            onChange={handleChange}
                            className="ml-4 text-right border px-2 py-1 rounded w-1/2 text-sm"
                          />
                        ) : (
                          <span className="font-medium text-gray-900">{row[col as keyof DataRow]}</span>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
