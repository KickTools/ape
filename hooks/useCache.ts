// hooks/useCache.ts
import { useState, useEffect } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  key: string;
}

const memoryCache = new Map<string, CacheItem<any>>();

export function useCache<T>({ ttl, key }: CacheConfig) {
  const isExpired = (timestamp: number) => {
    return Date.now() - timestamp > ttl;
  };

  const getFromStorage = (): CacheItem<T> | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item) as CacheItem<T>;
      if (isExpired(parsed.timestamp)) {
        localStorage.removeItem(key);
        return null;
      }
      
      return parsed;
    } catch {
      return null;
    }
  };

  const setToStorage = (data: T) => {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    
    try {
      localStorage.setItem(key, JSON.stringify(item));
      memoryCache.set(key, item);
    } catch (error) {
      console.warn('Failed to set cache:', error);
    }
  };

  const getFromCache = (): T | null => {
    // Check memory cache first
    const memItem = memoryCache.get(key) as CacheItem<T> | undefined;
    if (memItem && !isExpired(memItem.timestamp)) {
      return memItem.data;
    }
    
    // Fall back to localStorage
    const storageItem = getFromStorage();
    if (storageItem) {
      memoryCache.set(key, storageItem);
      return storageItem.data;
    }
    
    return null;
  };

  return {
    getFromCache,
    setToStorage,
  };
}