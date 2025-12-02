import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage"

enablePromise(true)

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "Shop.db", location: "default" },
    () => {},
    (error) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}
export const createTables = async (db: SQLiteDatabase) => {
  const cartTableQuery = `
    CREATE TABLE IF NOT EXISTS Cart (
      productId INTEGER PRIMARY KEY,
      productData TEXT NOT NULL,
      qty INTEGER NOT NULL
    );`
  try {
    await db.executeSql(cartTableQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables`)
  }
}

export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = []
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name)
      }
    })
    return tableNames
  } catch (error) {
    console.error(error)
    throw Error("Failed to get table names from database")
  }
}

export const removeTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`
  try {
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop table ${tableName}`)
  }
}

export const addToCartDB = async (
  db: SQLiteDatabase,
  product: any,
  qty: number
) => {
   const productData = JSON.stringify(product);
  await db.executeSql(
    `
    INSERT INTO Cart (productId, productData, qty)
    VALUES (?, ?, ?)
    ON CONFLICT(productId)
    DO UPDATE SET qty = qty + excluded.qty;
    `,
    [product.id, productData, qty]
  );
}

/** Get all cart items */
export const getCartItemsDB = async (db: SQLiteDatabase) => {
  const results = await db.executeSql(`SELECT * FROM Cart;`)
  const items: any[] = []

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);

      items.push({
        ...JSON.parse(row.productData),
        qty: row.qty,
      });
    }
  });

  return items
}

/** Remove item from cart */
export const removeCartItemDB = async (db: SQLiteDatabase, id: number) => {
  await db.executeSql("DELETE FROM Cart WHERE productId = ?", [id]);
};

/** Update quantity */
export const updateCartQtyDB = async (db: SQLiteDatabase, id: number, qty: number) => {
  await db.executeSql("UPDATE Cart SET qty = ? WHERE productId = ?", [qty, id]);
};


/** Clear entire cart */
export const clearCartDB = async (db: SQLiteDatabase) => {
  await db.executeSql(`DELETE FROM Cart;`)
}

