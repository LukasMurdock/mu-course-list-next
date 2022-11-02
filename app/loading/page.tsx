import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="m-auto max-w-prose space-y-2">
      <div className="flex space-x-2">
        <Skeleton width={142.55} height={40} rounded="md" />
        <Skeleton width={103.39} height={40} rounded="md" />
      </div>
      <Skeleton height={38} rounded="full" />
    </div>
  );
}
