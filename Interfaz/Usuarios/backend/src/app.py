from flask import Flask, render_template
from flask_pymongo import PyMongo
from flask_cors import CORS
from routes.indexroutes import indexRoutes
#from routes import indexRoutes
#from routes import indexrouter



#Initializations
app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/sistemajj'

mongo = PyMongo(app) #ejecutar mongodb
db = mongo.db.users


# routes # Blueprints
# app.register_blueprint(Movie.main, url_prefix='/api/movies')
app.register_blueprint(indexRoutes, url_prefix="/")



def page_not_found(error):
      return render_template('404.hbs'), 404


# start the server with the 'run()' method
if __name__ == "__main__": 
 
  # Error handlers
  app.register_error_handler(404, page_not_found)
  app.run(debug=True, port=3000)


''' Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//settings
//app.set('port'    ,process.env.PORT || 4000);
app.set("port", PORT); 
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

//Middlewares ----
//--Cada que lleguen datos de un formulario vamos a pasar datos a formato json para manipularlos
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/uploads'),
  filename: (req, file, cb, filename) => {  //cb callback
    path.extname(file.originalname )
      cb(null, uuidv4() + path.extname(file.originalname) );  
  }
});
//app.use(multer({  storage: storage}).array('myImages',3));
app.use(multer({  storage: storage}).single('myImage'));

  

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
  });

//Routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(inquilinosRoutes);
app.use(visitantesRoutes);
app.use(trabajadoresRoutes);

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

export default app;
'''