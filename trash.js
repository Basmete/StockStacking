
// Get all of our posts
app.get("/api/posts", (req, res) => {
  Post.find({}).then((posts) => {
    res.json(posts);
  });
});

// Get One of Our posts
app.get("/api/posts/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    res.json(post);
  });
});

// Create and Update post
app.post("/api/posts", (req, res) => {
  const data = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.findOne({ _id: req.body.id }, (err, post) => {
    if (post) {
      Post.findByIdAndUpdate(req.body.id, data, { upsert: false }).then(
        (updated) => {
          res.json(updated);
        }
      );
    } else {
      Post.create(data).then((created) => {
        res.json(created);
      });
    }
  });
});

// Delete selected post
app.post("/api/posts/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id).then((post) => {
    res.json({ message: "Your post was deleted!" });
  });
});
