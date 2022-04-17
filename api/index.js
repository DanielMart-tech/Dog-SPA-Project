//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Temperament, Breed_group } = require("./src/db.js");
const axios = require("axios");
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  const url = "https://api.thedogapi.com/v1/breeds?api_key=";

  // bulk Temperament table
  axios
    .get(`${url}${API_KEY}`)
    .then((result) => {
      const tempers = [];
      for (const dog of result.data) {
        tempers.push(dog.temperament);
      }

      let personalities = [];
      for (let i = 0; i < tempers.length; i++) {
        if (tempers[i] === undefined) continue;
        tempers[i].split(", ").map((temper) => personalities.push(temper));
      }

      const temperaments = [...new Set(personalities)];

      Temperament.bulkCreate(
        temperaments.map((temperament) => ({ name: temperament }))
      ).then(() => console.log("Temperaments data have been saved"));
    })
    .catch((error) => console.log(error.message));

  //bulk Breed_group table
  axios.get(`${url}${API_KEY}`).then((result) => {
    const groups = [];

    for (const dog of result.data) {
      if (!dog.breed_group) continue;
      groups.push(dog.breed_group);
    }

    const breedGroups = [...new Set(groups)];

    Breed_group.bulkCreate(breedGroups.map((group) => ({ breed: group })))
      .then(() => console.log("Breed group data have been saved"))
      .catch((error) => console.log(error.message));
  });

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
