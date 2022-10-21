export const renderIndex = (req, res) => {
    res.render("index",{ title: 'Web principal'})
  };
  
  export const renderAbout = (req, res) => {
    res.render("about",{ title: 'About me'})
  };
  export const renderContact = (req, res) => {
    res.render("contact",{ title: 'Contact'})
  };
  
  