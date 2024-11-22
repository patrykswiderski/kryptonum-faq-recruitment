import { type SchemaTypeDefinition } from 'sanity';

import { categoryType } from './categoryType';
import { questionType } from './questionType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, questionType]
};
