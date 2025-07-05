import { CardProps } from "@/types/dataTableTypes"
import type React from "react"

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]
         hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]
         ${className}
      `}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-semibold
        border-b border-gray-200 rounded-t-2xl ${className}
      `}
    >
      {children}
    </div>
  )
}

export const CardContent: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 text-gray-800 text-sm leading-relaxed ${className}`}>
      {children}
    </div>
  )
}

export const CardFooter: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        px-6 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-600
        rounded-b-2xl ${className}
      `}
    >
      {children}
    </div>
  )
}
