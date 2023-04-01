
import app from './server.js'
import './database.js';

async function main() {
  app.listen(app.get("port"));
  console.log("Server is listening on port 🚀", app.get("port"));
  console.log('Sistema Biométrico S & R') 
}

main();


/* de bluuweeb
import express from "express";
import path from 'path'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import exphbs from "express-handlebars";
import indexRoutes from './routes/index.router.js';
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
//settings
app.set('views', path.join(__dirname, 'views'));
// config view engine
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  });
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");
app.use(indexRoutes);
//static files
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) => {
    return res.status(404).render("404");
  });
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("error", {
      error,
    });
  });
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("listo!  En servidor  🚀 ",PORT);
});*/
