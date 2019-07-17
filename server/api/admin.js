const router = require("express").Router();
const { User, Review, Feedback } = require("../db/models");
module.exports = router;

// Routes to add/delete users
router.post("/users/add", async (req, res, next) => {
  try {
    const users = await User.create(req.body);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.delete("/users/delete/:id", async (req, res, next) => {
  try {
    const users = await User.findOne({ where: { id: req.params.id } });
    users.destroy();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Routes to fetch data
router.get("/reviews", async (req, res, next) => {
  try {
    const review = await Review.findAll();
    res.json(review);
  } catch (err) {
    next(err);
  }
});

router.get("/feedback", async (req, res, next) => {
  try {
    const feedback = await Feedback.findAll();
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});

// Routes to add data
router.post("/review/add", async (req, res, next) => {
  const {
    userId,
    reviewerId,
    professionalism,
    teamwork,
    performance,
    feedback
  } = req.body;

  // basic validation
  if (
    userId &&
    reviewerId &&
    professionalism &&
    teamwork &&
    performance &&
    feedback.length !== 0
  ) {
    try {
      const review = await Review.create(req.body);

      const feedbackObj = feedback.map(id => {
        return {
          feedbackUserId: id,
          feedback: "",
          complete: false,
          reviewId: review.get().id
        };
      });
      const createFeedback = await Feedback.bulkCreate(feedbackObj, {
        returning: true
      });

      res.json([review, createFeedback]);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).send("All fields must be filled out");
  }
});

router.post("/feedback/add", async (req, res, next) => {
  try {
    const feedback = await Feedback.findOne({ where: { id: req.body.id } });
    feedback.update(req.body);
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});
