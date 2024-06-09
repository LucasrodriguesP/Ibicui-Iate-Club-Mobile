import { openDatabase } from "expo-sqlite/legacy";;

const db = openDatabase('userDatabase.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);',
      [],
      () => {
        // Inserir um usuário de teste apenas se a tabela foi criada, ou seja, ela estava vazia
        tx.executeSql('SELECT * FROM users;', [], (_, { rows }) => {
          if (rows.length === 0) {
            tx.executeSql(
              'INSERT INTO users (username, password) VALUES (?, ?);',
              ['testuser', 'password123']
            );
          }
        });
      }
    );
  });
};

export const getUser = (username, password, successCallback, errorCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?;',
      [username, password],
      (_, { rows: { _array } }) => {
        if (_array.length > 0) {
          successCallback(_array[0]);
        } else {
          errorCallback('Usuário ou senha incorretos');
        }
      },
      (_, error) => {
        errorCallback(error.message);
      }
    );
  });
};

export default db;
