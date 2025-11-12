import type { CollectionEntry } from 'astro:content';


// Sorts case studies by date in descending order (newest first)
export function sortCaseStudiesByDateDesc(
  caseStudies: CollectionEntry<'case-studies'>[]
): CollectionEntry<'case-studies'>[] {
  return [...caseStudies].sort((a, b) => {
    const dateA = a.data.date;
    const dateB = b.data.date;
    
    // If both have dates, parse and compare
    if (dateA && dateB) {
      const parsedDateA = new Date(dateA).getTime();
      const parsedDateB = new Date(dateB).getTime();
      return parsedDateB - parsedDateA; // Descending order (newest first)
    }
    
    // If only A has a date, it comes first
    if (dateA && !dateB) return -1;
    
    // If only B has a date, it comes first
    if (!dateA && dateB) return 1;
    
    // If neither has a date, maintain original order
    return 0;
  });
}

