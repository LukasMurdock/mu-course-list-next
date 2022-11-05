'use client';
import { useSearchParams } from 'next/navigation';

/**
 * This fixes search params issue on client.
 */
export default function UseSearchParams() {
  useSearchParams();
  return null;
}
