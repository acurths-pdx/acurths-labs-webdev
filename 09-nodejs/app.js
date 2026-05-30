const http = require("http");
const static = require("node-static");
const querystring = require("node:querystring");

const port = process.env.PORT || 5002;

const file = new static.Server("./exercise");

const server = http.createServer((req, res) => {
  // main route
  if (req.method === "GET" && req.url === "/") {
    file.serveFile("/welcome.html", 200, {}, req, res);
  }
  // form route
  else if (req.method === "GET" && req.url === "/form") {
    file.serveFile("/form.html", 200, {}, req, res);
  }
  // form submission
  else if (req.method === "POST" && req.url === "/formExerciseSubmit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const userdata = querystring.parse(body);
      const { nameInput: name, emailInput: email } = userdata;

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write('<!doctype html>\n<html lang="en">');
      res.write("<head><title>Form Submission Result</title></head>");
      res.write(`<p>Thank you for submitting your information: </p>`);
      res.write(`<p>Name: ${name}</p>`);
      res.write(`<p>Email: ${email}</p>`);
      res.write("</html>");
      res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
