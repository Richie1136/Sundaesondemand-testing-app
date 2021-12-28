import React, { useState, useMemo, useContext, useEffect, createContext } from 'react'
import { pricePerItem } from '../constants';

// format numbers as currency

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider

export const useOrderDetails = () => {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider')
  }
  return context
}

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }

  return optionCount * pricePerItem[optionType]
}

export const OrderDetailsProvider = ({ children }) => {

  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  });

  const zeroCurrency = formatCurrency(0)

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  })

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts)
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
    const grandTotal = scoopsSubtotal + toppingsSubtotal
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionCounts])

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCounts = { ...optionCounts }
      // update option count for this item with the new value 
      const optionCountsMap = optionCounts[optionType]
      optionCountsMap.set(itemName, parseInt(newItemCount))
      setOptionCounts(newOptionsCounts)
    }
    // getter: object containing option count for scoops and toppings, subtotal and total
    // setter: updateOptionCount 
    return [{ ...optionCounts, totals }, updateItemCount]
  }, [optionCounts, totals])


  return (
    <OrderDetails.Provider value={value}>
      {children}
    </OrderDetails.Provider>
  )
}

export default OrderDetails


