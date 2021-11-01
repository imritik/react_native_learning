import SQLite from 'react-native-sqlite-storage';
import Place from '../../models/place';

const tableName = 'placesData';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'places.db', location: 'default'});
};

// export const createTable = async (db: SQLiteDatabase) => {
//   const query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);`;
//   await db.executeSql(query);
// };
