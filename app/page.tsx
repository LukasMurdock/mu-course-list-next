import { fetchSelectableTerms } from '@/lib/ws.miamioh.edu/wrapper';
import { redirect } from 'next/navigation';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchSettings } from '@/components/search/SearchSettings';
import UseSearchParams from '@/components/search/UseSearchParams';

// This is an async Server Component
export default async function Page({ searchParams }: { searchParams: any }) {
  const termId = searchParams.termId;
  const campusCode = searchParams.campusCode;
  const selectableTerms = await fetchSelectableTerms();

  // Set default termId
  if (!termId || typeof termId !== 'string') {
    const nextTerm =
      selectableTerms[selectableTerms.findIndex((term) => term.current) - 1];
    if (!nextTerm) throw new Error('No current term found');
    searchParams.termId = nextTerm.termId;
    // Would like to redirect, but redirect seems broken at the moment
    // redirect(`/?termId=${currentTerm.termId}`);
  }

  //   // Set default campusCode
  if (!campusCode || typeof campusCode !== 'string') {
    searchParams.campusCode = 'O';
    // Would like to redirect, but redirect seems broken at the moment
  }

  return (
    <div className="m-auto max-w-prose space-y-4">
      <div className="space-y-2">
        <SearchSettings terms={selectableTerms} searchParams={searchParams} />
        <form method="get">
          <SearchInput searchParams={searchParams} />
        </form>
        <SearchResults searchParams={searchParams} />
      </div>
      <UseSearchParams />
    </div>
  );
}
