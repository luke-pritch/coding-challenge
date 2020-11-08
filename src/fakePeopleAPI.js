//THERE IS NO NEED TO MODIFY THIS FILE, THOUGH IF YOU DO FIND SOMETHING WRONG PLEASE LET US KNOW

const people = [
  {
    id: 1,
    name: "Alice",
    age: 23,
    favourite_color: "red",
    favourite_food: "burgers",
    friends: [2, 4],
  },
  {
    id: 2,
    name: "Bob",
    age: 32,
    favourite_color: "blue",
    favourite_food: "Buffalo Wings",
    friends: [1, 4],
  },
  {
    id: 3,
    name: "Eve",
    age: 14,
    favourite_color: "Pink",
    favourite_food: "Chicken fingers",
    friends: [4],
  },
  {
    id: 4,
    name: "Ancient Wizard",
    age: 502,
    favourite_color: "Grey",
    favourite_food: "Frog legs",
    friends: [1, 2, 3, 5],
  },
  {
    id: 5,
    name: "Linda",
    age: 45,
    favourite_color: "Black",
    favourite_food: "Grilled Cheese",
    friends: [4, 1, 3],
  },
];

function deepCopyPeople(people) {
  return people.map(({ friends, ...rest }) => ({
    friends: [...friends],
    ...rest,
  }));
}

// get the full list of people
export function getPeople() {
  return new Promise((resolve) => resolve({ data: deepCopyPeople(people) }));
}

// get a specific person by thier id
export function getPerson(id) {
  const person = people.find((person) => person.id === id);

  return new Promise((resolve, reject) => {
    if (person) resolve({ data: { ...person } });
    else reject("Person not found");
  });
}

// create a new person, get back that new person and their id
export function postPerson(person) {
  const new_person = {
    ...person,
    friends: [...person.friends],
    id: people.length + 1,
  };
  people.push(new_person);
  return new Promise((resolve) => resolve({ data: new_person }));
}

// patch a person by id, get back the updated person object
// patchPerson(id, {age:30}) would patch thier age to 20
export function patchPerson(id, patch) {
  return new Promise((resolve, reject) => {
    let person = people.find((person) => person.id == id);
    if (person) {
      Object.assign(person, patch);
      resolve({ data: { ...person } });
    } else {
      reject("Person not found");
    }
  });
}

//delete a person by id
export function deletePerson(id) {
  return new Promise((resolve, reject) => {
    const index = people.findIndex((person) => person.id === id);
    if (index === -1) reject("Person not found");

    people.splice(index, 1);
    people.forEach(({ friends }) => {
      const index = friends.findIndex((friend_id) => friend_id === id);
      if (index !== -1) friends.splice(index, 1);
    });
    resolve();
  });
}
