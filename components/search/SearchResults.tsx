import { searchMiamiCourses } from '@/lib/ws.miamioh.edu/api';
import { CourseSections } from '@/lib/ws.miamioh.edu/api-types';
import { parseCourses } from '@/lib/ws.miamioh.edu/wrapper';
import { Suspense } from 'react';
import { DescriptionList } from '@/components/DescriptionList';

export function SearchResults({
  searchParams,
}: {
  searchParams: { termId: string; campusCode: string; q: string };
}) {
  const courses = parseCourses(searchParams.q);

  return (
    <div className="space-y-2">
      {courses.map((course) => {
        return (
          /* @ts-expect-error Server Component */
          <SearchResult
            key={course.query}
            course={course}
            searchParams={searchParams}
          />
        );
      })}
    </div>
  );
}

async function SearchResult({
  course,
  searchParams,
}: {
  course: ReturnType<typeof parseCourses>[number];
  searchParams: { termId: string; campusCode: string; q: string };
}) {
  if (!course.success) {
    return (
      <div className="rounded-md border border-red-500 p-4">
        <p className="truncate text-sm font-bold text-red-500">
          {course.query}
        </p>
        <DescriptionList
          list={course.errors.map((error) => {
            return {
              title: 'Error',
              description: error,
            };
          })}
        />
      </div>
    );
  }

  const result = searchMiamiCourses({
    termId: Number(searchParams.termId),
    campusCode: searchParams.campusCode,
    subject: course.subjectCode,
    courseNumber: Number(course.courseNumber),
    courseSectionCode: course.sectionCode,
  });

  return (
    <Suspense fallback={<div>Loading {course.query}...</div>}>
      {/* @ts-expect-error Server Component */}
      <CourseCard sections={result} query={course.query} />
    </Suspense>
  );
}

async function CourseCard({
  sections,
  query,
}: {
  sections: Promise<CourseSections>;
  query: string;
}) {
  const data = await sections;

  if (data.courseSections.length === 0) {
    return (
      <div className="rounded-md border p-4">
        <p className="truncate text-sm">
          No results for{' '}
          <span className="rounded-md bg-gray-50 p-1">{query}</span>
        </p>
      </div>
    );
  }

  return (
    <>
      {data.courseSections.map((result) => {
        return (
          <div key={result.courseId} className="rounded-md border p-4">
            <p className="truncate text-sm font-bold">{result.courseCode}</p>
            <DescriptionList
              list={[
                {
                  title: 'CRN',
                  description: result.courseId,
                },
                {
                  title: 'Credit hours',
                  description: `${result.lectureHoursLow} - ${result.lectureHoursHigh}`,
                },
                {
                  title: 'Enrollment',
                  description: `${result.enrollmentCountCurrent} / ${result.enrollmentCountMax}`,
                },
              ]}
            />
          </div>
        );
      })}
    </>
  );
}
