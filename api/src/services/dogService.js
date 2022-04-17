const express = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const {
  Temperament,
  Dog,
  dog_temperament,
  Breed_group,
  dog_breed_group,
} = require("../db");

const server = express();
server.use(express.json());

const url = "https://api.thedogapi.com/v1/breeds";
const img =
  "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Dog-main_gdcdzd.jpg";

class DogService {
  getDogs(res) {
    axios
      .get(`${url}?api_key=${API_KEY}`)
      .then((result) => {
        return result.data;
      })
      .then((apiDogs) => {
        Dog.findAll({
          include: [
            {
              model: Temperament,
            },
            {
              model: Breed_group,
            },
          ],
        }).then((createdDogs) => {
          const dogs = [];
          console.log(createdDogs);
          for (const { dataValues } of createdDogs) {
            dogs.push({
              id: dataValues.id,
              image: img,
              name: dataValues.name,
              weight: dataValues.weight,
              height: dataValues.height,
              temperament: dataValues.temperaments
                .map((temper) => temper.name)
                .join(", "),
              life_span: dataValues.life_span,
              breed_group: dataValues.breed_groups
                .map((item) => item.breed)
                .join(),
            });
          }

          apiDogs.map((dog) => {
            dogs.push({
              id: dog.id,
              image: dog.image.url,
              name: dog.name,
              temperament: dog.temperament,
              weight: dog.weight.metric,
              breed_group: dog.breed_group,
            });
          });

          res.json(dogs);
        });
      })
      .catch((error) => res.status(404).send(error.message));
  }

  getDogName(req, res) {
    const { name } = req.query;

    if (name) {
      axios
        .get(`${url}/search?q=${name}&api_key=${API_KEY}`)
        .then((result) => {
          if (result.data.length === 0)
            throw new Error(
              `There are no dogs that include ${name} in its name`
            );

          const dogs = result.data.map((dog) => ({
            ...dog,
            weight: dog.weight.metric,
            height: dog.height.metric,
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
          }));

          res.json(dogs);
        })
        .catch((error) => res.send(error.message));
    }
  }

  getDogId(req, res) {
    let { identifier } = req.params;

    axios
      .get(`${url}?api_key=${API_KEY}`)
      .then((result) => {
        let [specificDog] = result.data.filter(
          (dog) => dog.id === Number(identifier)
        );
        if (specificDog === undefined)
          throw new Error(`No dogs have ${identifier} as an id`);
        console.log(specificDog);
        const {
          id,
          image: { url: image },
          name,
          temperament,
          weight: { metric: weight },
          height: { metric: height },
          life_span,
        } = specificDog;

        res.json({
          id,
          image,
          name,
          temperament,
          weight,
          height,
          life_span,
        });
      })
      .catch((error) => res.send(error.message));
  }

  getTemperaments(res) {
    Temperament.findAll()
      .then((result) => {
        if (result.length === 0) throw new Error("Internal error");
        res.json(result);
      })
      .catch((error) => res.send(error.message));
  }

  postDog(req, res) {
    const newDog = req.body;

    if (!newDog.name || !newDog.height || !newDog.weight) {
      return res.status(400).json({ error: "name, height or weight missing" });
    }

    Dog.create(newDog)
      .then((result) => {
        res.json(result);

        for (const temperament of newDog.temperaments) {
          dog_temperament
            .create({
              dogId: result.id,
              temperamentId: Object.keys(temperament).map((e) => Number(e)),
            })
            .then(() => console.log("successfully created"))
            .catch((error) => console.error(error.message));
        }

        let indexGroup;
        Breed_group.findAll({ raw: true }).then((groups) => {
          for (let i = 0; i < groups.length; i++) {
            indexGroup = i + 1;
            if (groups[i].breed.toLowerCase() === newDog.breed.toLowerCase()) {
              dog_breed_group.create({
                dogId: result.id,
                breedGroupId: indexGroup,
              });
              return;
            }
          }

          Breed_group.create({ breed: newDog.breed }).then((obj) => {
            dog_breed_group.create({
              dogId: result.id,
              breedGroupId: obj.dataValues.id,
            });
          });
        });
      })
      .catch((error) => console.log(error.message));
  }
}

module.exports = DogService;
