const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mink-db");

const User = require("../models/user");

const users = [
  {
    username: "Coach1",
    password: "test1",
    email: "test1@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "coach",
    description: "test test test"
  },
  {
    username: "Coach2",
    password: "test2",
    email: "test2@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "coach",
    description: "test test test"
  },
  {
    username: "Coach3",
    password: "test3",
    email: "test3@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "coach",
    description: "test test test"
  },
  {
    username: "Coach4",
    password: "test4",
    email: "test4@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "coach",
    description: "test test test"
  },
  {
    username: "Coach5",
    password: "test5",
    email: "test5@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "coach",
    description: "test test test"
  },
  {
    username: "Candidate1",
    password: "test1",
    email: "candidat1@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "candidate",
    description: "test test test"
  },
  {
    username: "Candidate2",
    password: "test2",
    email: "candidat2@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "candidate",
    description: "test test test"
  },
  {
    username: "Candidate3",
    password: "test3",
    email: "candidat3@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "candidate",
    description: "test test test"
  },
  {
    username: "Candidate4",
    password: "test4",
    email: "candidat4@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "candidate",
    description: "test test test"
  },
  {
    username: "Candidate5",
    password: "test5",
    email: "candidat5@test.com",
    firstname: "toto",
    lastname: "zero",
    telephone: "0143057208",
    adress: {
      adresse: "2 rue test",
      zipcode: "93160",
      city: "Paris"
    },
    age: 20,
    category: ["Anglais", "Faire un CV", "Faire une lettre de motivation"],
    role: "candidate",
    description: "test test test"
  }
];

User.create(users, (err, docs) => {
  if (err) console.error(err);
  mongoose.connection.close();
});
