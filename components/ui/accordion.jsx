"use client"

import { useState, createContext, useContext } from "react"
import { ChevronDown } from "lucide-react"

const AccordionContext = createContext()

export function Accordion({ children }) {
  const [openItems, setOpenItems] = useState(new Set())
  
  const toggleItem = (value) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(value)) {
      newOpenItems.delete(value)
    } else {
      newOpenItems.clear()
      newOpenItems.add(value)
    }
    setOpenItems(newOpenItems)
  }
  
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ children, value }) {
  return <div className="border rounded-lg">{children}</div>
}

export function AccordionTrigger({ children, value }) {
  const { openItems, toggleItem } = useContext(AccordionContext)
  const isOpen = openItems.has(value)
  
  return (
    <button
      className="flex w-full items-center justify-between p-3 text-left hover:bg-gray-50 text-sm"
      onClick={() => toggleItem(value)}
      type="button"
    >
      {children}
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  )
}

export function AccordionContent({ children, value }) {
  const { openItems } = useContext(AccordionContext)
  const isOpen = openItems.has(value)
  
  if (!isOpen) return null
  
  return <div className="px-3 pb-3 text-xs">{children}</div>
}