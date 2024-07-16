import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = join(__dirname, '..', 'public', 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Verificar la extensión del archivo
        if (file.originalname.endsWith('.pdf')) {
            cb(null, file.fieldname + '&' + file.originalname);
        } else {
            cb(new Error('Solo se permiten archivos PDF'), null);
        }
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB en bytes
});

export default upload;
