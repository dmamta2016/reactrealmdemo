import {createRealmContext} from '@realm/react';
import {Movie} from './Movie';


export const MovieRealmContext = createRealmContext({
  schema: [Movie],
  schemaVersion:4
});
