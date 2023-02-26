import Inquilino from "../models/Inquilino.js";

export const renderIndex = (req, res) => {
    res.render("index",{ title: 'Web principal'})
  };
  
  export const renderAbout = (req, res) => {
    res.render("about",{ title: 'About me'})
  };
  export const renderContact = (req, res) => {
    res.render("contact",{ title: 'Contact'})
  };



  
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
  
  