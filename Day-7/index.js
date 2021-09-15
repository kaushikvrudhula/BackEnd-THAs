const app = require("express")();

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.get("/flaggedpath", (req, res) => {
    res.status(200).send(req.query);
  });
  app.get("/a?b?cd", (req, res) => res.status(201).send("hi there"));

  app.get("/ab*cd", (req, res) => res.status(201).send("anything between ab and cd"));
  app.get("/x(ad)?e", (req, res) =>
  res.status(201).send("it works without ad or with ad")
);


app.get(/.*fly$/, (req, res) =>
  res.status(200).send("?")
);

app.get("/profile/:userid", (req, res) => res.status(200).send(req.params));

app.listen(3000);