import { fetchSelectableTerms } from '@/lib/ws.miamioh.edu/wrapper';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchSettings } from '@/components/search/SearchSettings';

// This is an async Server Component
export default async function Page({ searchParams }: { searchParams: any }) {
  const termId = searchParams.termId;
  const campusCode = searchParams.campusCode;
  const selectableTerms = await fetchSelectableTerms();

  // Set default termId
  if (!termId || typeof termId !== 'string') {
    const currentTerm = selectableTerms.find((term) => term.current);
    if (!currentTerm) throw new Error('No current term found');
    searchParams.termId = currentTerm.termId;
    // Would like to redirect, but redirect seems broken at the moment
  }

  // Set default campusCode
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
        {searchParams.q ? <SearchResults searchParams={searchParams} /> : null}
      </div>
    </div>
  );
}
