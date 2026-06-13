import sequelize from "../src/config/sequelize.js";
import "../src/sequelizeModels/index.js";
import pool from "../src/config/db.js";
import { User } from "../src/sequelizeModels/index.js";
import { readFile } from "fs/promises";

 
async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
 
    await sequelize.sync({ alter: true });
    await sequelize.query(`
  UPDATE users
  SET
    nombre = CASE id
      WHEN 1 THEN 'Jonatan'
      WHEN 2 THEN 'Elizabet'
      WHEN 7 THEN 'Daiana'
      WHEN 9 THEN 'Elizabet'
      WHEN 11 THEN 'Cecilia'
    END,
    email = CASE id
      WHEN 1 THEN 'jonatan@fotaza.test'
      WHEN 2 THEN 'eli79@fotaza.com'
      WHEN 7 THEN 'dai76@fotaza.com'
      WHEN 9 THEN 'david@fotaza.com'
      WHEN 11 THEN 'joni2401@fotaza.com'
    END,
    password = '$2b$10$Zs27Jui9lI/8vK4dmt.yGOp/apX.56TpN4pN9ZPpQjjAh55/WuWVW',
    estado = 'activo',
    rol = 'usuario'
  WHERE id IN (1, 2, 7, 9, 11);
`);

console.log("Usuarios de prueba actualizados.");
    console.log("Tablas creadas/verificadas correctamente:");
    console.log("  ✓ users");
    console.log("  ✓ posts");
    console.log("  ✓ comments");
    console.log("  ✓ followers");
    console.log("  ✓ ratings");
    console.log("  ✓ notifications");
    console.log("  ✓ collections");
    console.log("  ✓ collection_posts");
    console.log("  ✓ interests");
    console.log("  ✓ post_reports");
    console.log("  ✓ comment_reports");
    console.log("  ✓ private_messages");
    console.log("  ✓ post_images");

    const usersCount = await User.count();

    if (usersCount === 0) {
      const seedUrl = new URL("./seed.sql", import.meta.url);
      const seedFile = await readFile(seedUrl, "utf8");
      const seedSql = seedFile
        .split(/\r?\n/)
        .filter(line => !line.trimStart().startsWith("\\"))
        .join("\n");

      await pool.query(seedSql);
      console.log("  ✓ datos de prueba cargados desde database/seed.sql");
    } else {
      console.log("  - datos de prueba omitidos porque la base ya contiene usuarios");
    }

    await sequelize.query(`
      INSERT INTO post_images (post_id, url, orden)
      SELECT posts.id, posts.imagen, 0
      FROM posts
      WHERE NOT EXISTS (
        SELECT 1
        FROM post_images
        WHERE post_images.post_id = posts.id
      )
      ON CONFLICT (post_id, orden) DO NOTHING
    `);
    console.log("  ✓ imágenes existentes vinculadas a post_images");
 
    console.log("\nBase de datos inicializada correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1);
  }
}
 
initDB();

