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
}