import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names into a single string, handling Tailwind CSS conflicts.
 * @param inputs - The class names to merge.
 * @returns The merged class names string.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
