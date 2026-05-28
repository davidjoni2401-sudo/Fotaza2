import sequelize from "../src/config/sequelize.js";
import "../src/sequelizeModels/index.js";
 
async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
 
    await sequelize.sync({ force: false });
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
 
    console.log("\nBase de datos inicializada correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1);
  }
}
 
initDB();