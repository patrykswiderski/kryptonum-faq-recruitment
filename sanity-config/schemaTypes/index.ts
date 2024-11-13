import { type SchemaTypeDefinition } from 'sanity';

import { categoryType } from './categoryType';
import { authorType } from './authorType';
import { questionType } from './questionType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, authorType, questionType]
};
