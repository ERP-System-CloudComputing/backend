import path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default class FilesController {

    async uploadPDF(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
            }

            const file = req.file;

            const mime = file.mimetype;
            let folder = 'others';

            if (mime === 'application/pdf') {
                folder = 'pdfs';
            } else if (mime.startsWith('image/')) {
                folder = 'images';
            }

            const fileResponse =  {
                fileName: file.filename,
                filePath: `/uploads/${folder}/${file.filename}`,
                mimeType: file.mimetype
            };
            res.status(200).json(fileResponse);
        } catch (error) {
            next(error);
        }
    }

    async getPDF(req, res, next) {
        try {
            const { filename } = req.params;
            
            const filePath = path.join(__dirname, '..', 'uploads', 'pdfs', filename);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'Archivo no encontrado.' });
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.sendFile(filePath, (err) => {
                if (err) {
                    return next(err);
                }
            })
        } catch (error) {
            next(error);
        }
    }
}