

  export const renderIndex = async (req, res) => {
    res.render("index",{  title: 'Web principal'})
  };
  
  export const renderAbout = (req, res) => {
    res.render("about",{ title: 'About me'})
  };
  
