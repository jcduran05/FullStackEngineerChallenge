"use strict";

const db = require("../server/db");
const {
  User,
  Review,
  ReviewFeedback,
  Feedback
} = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      name: "Manager 1",
      email: "admin1@email.com",
      password: "123",
      role: 2
    }),
    User.create({
      name: "Manager 2",
      email: "admin2@email.com",
      password: "123",
      role: 2
    }),
    User.create({
      name: "Employee 1",
      email: "emp1@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 2",
      email: "emp2@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 3",
      email: "emp3@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 4",
      email: "emp4@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 5",
      email: "emp5@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 6",
      email: "emp6@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 7",
      email: "emp7@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 8",
      email: "emp8@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 9",
      email: "emp9@email.com",
      password: "123",
      role: 3
    }),
    User.create({
      name: "Employee 10",
      email: "emp10@email.com",
      password: "123",
      role: 3
    })
  ]);

  const reviews = await Promise.all([
    Review.create({
      reviewerId: users[1].dataValues.id,
      userId: users[3].dataValues.id,
      professionalism: 5,
      teamwork: 5,
      performance: 5
    }),
    Review.create({
      reviewerId: users[1].dataValues.id,
      userId: users[4].dataValues.id,
      professionalism: 5,
      teamwork: 5,
      performance: 5
    })
  ]);

  const feedback = await Promise.all([
    Feedback.create({
      reviewId: reviews[0].dataValues.id,
      feedbackUserId: users[5].dataValues.id,
      feedback: "sample feedback 1",
      complete: true
    }),
    Feedback.create({
      reviewId: reviews[0].dataValues.id,
      feedbackUserId: users[6].dataValues.id,
      feedback: "sample feedback 2",
      complete: true
    }),
    Feedback.create({
      reviewId: reviews[1].dataValues.id,
      feedbackUserId: users[6].dataValues.id,
      feedback: "sample feedback 3",
      complete: true
    })
  ]);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
