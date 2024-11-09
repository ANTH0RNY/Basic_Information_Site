const { createServer } = require("http");
const { createReadStream } = require("fs");
const { url } = require("inspector");

const port = 12345;

const app = createServer((req, res) => {
  const url = req.url;
  switch (url) {
    case "/":
      handleIndex(req, res);
      break;
    case "/about":
      handleAbout(req, res);
      break;
    case "/contact-me":
      handleContactMe(req, res);
      break;
    default:
      handle404(req, res);
  }
});

app.listen(port, () => {
  console.log(`[Server] Running at http://127.0.0.1:${port}`);
});

function handlerCreator(path) {
  return function handler(req, res) {
    res.setHeader("Content-Type", "text/html");
    createReadStream(path).on("error", handleError).pipe(res);
  };
}

const index = "./pages/index.html";
const handleIndex = handlerCreator(index);

const about = "./pages/about.html";
const handleAbout = handlerCreator(about);

const contactMe = "./pages/contact-me.html";
const handleContactMe = handlerCreator(contactMe);

function handleError(req, res) {
  res.statusCode = 500;
  res.end();
}

function handle404(req, res) {
  res.statusCode = 404;
  const notFound = "./pages/404.html";
  // createReadStream(notFound).on("error", handleError).pipe(res);
  handlerCreator(notFound)(req, res);
}
