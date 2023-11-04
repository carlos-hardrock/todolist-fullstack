const validateTitle = (req, res, next) => {
  const {body} = req;

  if(body.title === undefined) {
    return res.status(400).json({message : 'Campo "title" deve ser informado.'});
  }

  if(body.title.trim() === '') {
    return res.status(400).json({message : 'Campo "title" não deve ser vazio.'});
  }

  next();

};

const validateStatus = (req, res, next) => {
  const {body} = req;
  
  if(body.status === undefined) {
    return res.status(400).json({message : 'Campo "status" deve ser informado.'});
  }
  
  if(body.status.trim() === '') {
    return res.status(400).json({message : 'Campo "status" não deve ser vazio.'});
  }
  
  next();
  
};

module.exports = {
  validateTitle,
  validateStatus
};
