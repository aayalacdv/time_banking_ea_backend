import multer from 'multer'; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        //@ts-ignore
        cb(null, req.user.email + '.jpeg')
    }
  });
  
  const upload = multer({ storage: storage });

  export default upload;