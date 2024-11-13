import type { StructureResolver } from 'sanity/structure';
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Faq website')
    .items([
      S.documentTypeListItem('faqQuestions').title('Faq questions'),
      S.documentTypeListItem('category').title('Category'),
      S.documentTypeListItem('author').title('Author'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['faqQuestions', 'category', 'author'].includes(item.getId()!)
      )
    ]);
