const express = require('express');
const app = express();
const getFeed = require('./getFeed');
const PORT = 3001;

app.use(express.json());

app.get('/getFeed', async  (req, res) => {
  const userId = req.body?.userId;

  if (userId === undefined) {
    res.status(400).send('Please enter userId');
  } else if (String(userId) !== userId) {
    res.status(400).send('UserId must be a string');
  } else {
    const result = await getFeed(userId)
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send('Some error occurred.');
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
})