import multer from "multer";
import path from "path";

function useMulter(PATH: string){
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "..", PATH))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });
}

export default useMulter;
