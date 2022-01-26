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
  
const serviceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {

        //@ts-ignore
        cb(null, 'service_'+ req.user.email+'.jpeg')
    }
  });

  const upload = multer({ storage: storage });
  export const uploadService = multer({storage : serviceStorage});

  export default upload;