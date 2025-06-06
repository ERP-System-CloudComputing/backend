import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import FilesController from '../controllers/FilesController.js'

const router = Router()
const filesController = new FilesController()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const mime = file.mimetype

        let subfolder = '/other'

        if (mime === 'application/pdf') {
            subfolder = '/pdfs'
        } else {
            subfolder = '/other'
        }

        const dir = path.join(__dirname, '..', 'uploads', subfolder)

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

const filesRoutes = [
    {
        method: 'post',
        path: '/upload-pdf',
        middleware: [upload.single('file')],
        handler: 'uploadPDF'
    },
    {
        method: 'get',
        path: '/pdf/:filename',
        middleware: [],
        handler: 'getPDF'
    }
]

filesRoutes.forEach( route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        filesController[route.handler].bind(filesController)
    )
})

export default router 