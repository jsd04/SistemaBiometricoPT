import Image from '../models/image.model.js';
import multer from 'multer';
import path from 'path'
export const renderIndex = (req, res) => {
    res.render("index",{ title: 'Web principal'})
  };
  
  export const renderAbout = (req, res) => {
    res.render("about",{ title: 'About me'})
  };
  export const renderContact = (req, res) => {
    res.render("contact",{ title: 'Contact'})
  };

  /* ************* Subida de foto  *********** */

  
  /*app.use(multer({
    dest: path.join(__dirname,'public/uploads'),
     /*destination(req, file, cb) {
       cb(null, path.join(__dirname,'public/uploads'));
     },
     filename:
       uuid.v4() + path.extname(file.originalname)
     
   }).single('myImage'));
   */
   

  //exports.upload = upload.single('myFile')

  export const uploadFile = async (req,res) => {
    let errors = [];
    const { rostro} = req.body;
   
    if (!rostro) {
      errors.push({ text: "Por favor ingresa la iamgen" });
    }
   /* if (errors.length > 0) {
      return res.render("/", {
        errors,
        name,
        rostro,
      });
    }*/
    const storage = multer.diskStorage({
    destination: 'src/public/uploads',
    filename: (req, file, cb) => {
      let ext=path.extname(file.originalname )
        cb(null, /*`${Date.now()}-${ */ Date.now()+ext /*}`*/);
    }
  });
    const upload = multer({ storage: storage }).single('myImage');

      upload (req,res,(err)=>{
        if (err) return next(err);
        // Saving a Imagen
        const newImage = new Image({ rostro:{
          data:req.file.filename,
          contentType: 'image/png'}

        })
        newImage.save();
        req.flash("success_msg", "La subdia ha sido un éxito.");
        
      })
      };
    /*console.log("success_msg", 'Enviar un archivo');
    res.render("index",{title:'subir foto'})
    console.log(req.file);*/
  


  
  /*
  export const buscador = async (req,res) => {
    
    console.log('query -> ',req.query)
    console.log('query.buscar -> ',req.query.buscar)
    if(req.query.buscar){
      console.log("buscar ", req.query.buscar)
      const inquilinosFound = await Inquilino.find({nombre:{ $eq: req.query.buscar}})
      .sort({ date: "desc" })
      .lean();
      console.log('El Inquilino que coincidio es :   ', inquilinosFound)
      res.render("index",{ inquilinosFound })
    }
    else{
      console.log("no hay parametro")
      res.render("index")
    }
  };*/

  //router.get('/',(req,res))
  
  