import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const questionType = defineType({
  name: 'faqQuestions',
  title: 'Faq questions',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Questions',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answers',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    })
  ]
});
