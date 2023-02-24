import { useContext } from 'react';
import { TabVisibilityContext } from '../context/TabVisibilityContext';


export const useTabVisibility = (): boolean => {
  /**
   * Gets the current tab visibility from context (true if tab bar is visible)
   */
  return useContext(TabVisibilityContext);
};
