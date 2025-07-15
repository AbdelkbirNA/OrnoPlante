const { getUser } = require("./src/services/getUser"); // adapte le chemin si besoin

async function test() {
  try {
    const userIdToTest = 1; // Mets ici un user_id existant dans ta base
    const user = await getUser(userIdToTest);
    console.log("Utilisateur trouvé :", user);
  } catch (err) {
    console.error("Erreur testGetUser :", err);
  }
}

test();
