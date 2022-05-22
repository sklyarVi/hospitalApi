import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import limit from 'express-rate-limit'

import {readPatients, readPatient, addPatient, deletePatient, updatePatient} from "src/routes/patients";
import {readDoctors, readDoctor, addDoctor, deleteDoctor, updateDoctor} from "src/routes/doctors";

import { logger } from 'src/logger'
import { TServer } from 'src/types/server.types'
import config from 'src/config'

const LIMITER_TIME = 15 * 60 * 1000
const LIMITER_MAX = 250

export const startServer = ({ port, corsOptions }: TServer) => {
    const server = express()

    server.use(helmet())
    server.use(cors(corsOptions || {}))
    server.disable('x-powered-by')
    server.use(limit({ windowMs: LIMITER_TIME, max: LIMITER_MAX }))

    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))

    logger.info(`Server will be started at port ${port}`)
    logger.info('Starting server...')

    server.get('/', (req, res) => {
        res.send('<h1> Welcome to our Hospital! </h1>')
    })
// Patients
    server.get('/patients', readPatients)
    server.get('/patient/:id', readPatient)
    server.post('/patient/post', addPatient)
    server.delete('/patient/del/:id', deletePatient)
    server.put('/patient/update/:id', updatePatient)
// Doctors
    server.get('/doctors', readDoctors)
    server.get('/doctor/:id', readDoctor)
    server.post('/doctor/post', addDoctor)
    server.delete('/doctor/del/:id', deleteDoctor)
    server.put('/doctor/update/:id', updateDoctor)

    server.listen(port, () => {
        logger.info(`Server for ${config.name} ready at port ${port}`)
    })
}