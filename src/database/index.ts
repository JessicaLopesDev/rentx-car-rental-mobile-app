import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
//import { Car } from './model/Car';

import { User } from './model/User';
import { schemas } from './schema';

const adapter = new SQLiteAdapter({
  schema: schemas
});

export const database = new Database({
  adapter,
  modelClasses: [User]
});