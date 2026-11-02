'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * 將 state 同步到瀏覽器 localStorage，
 * 重新整理或關閉網頁後資料都會保留。
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  // 首次載入時，從 localStorage 讀取資料
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        setValue(JSON.parse(stored) as T)
      }
    } catch (error) {
      console.log('[v0] 讀取 localStorage 失敗:', error)
    }
    setHydrated(true)
  }, [key])

  // 資料變更時，寫入 localStorage
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log('[v0] 寫入 localStorage 失敗:', error)
    }
  }, [key, value, hydrated])

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => (typeof next === 'function' ? (next as (p: T) => T)(prev) : next))
  }, [])

  return [value, update, hydrated] as const
}
