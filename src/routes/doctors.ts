import express, {Request, Response} from "express";

import dataNames from 'src/data/doctors.json';

export const readDoctors = (req: Request, res: Response) => {
    res.json(dataNames.doctors);
}

export const readDoctor = (req: Request, res: Response) => {
    let found = false
    dataNames.doctors.forEach((element) => {
        if (element.id.toString() === req.params.id) {
            res.json(element)
            found = true
        }
    })

    if (!found) {
        res.send('Provided patient id is invalid!')
    }
}

export const addDoctor = (req: Request, res: Response) => {
    const userAdd = req.body
    let filtres = dataNames.doctors.filter((user) => user.id == userAdd.id)

    if (filtres.length == 1) {
        console.log('xD')
        res.send('Provided patient ID is occupied!')
    } else if (filtres.length == 0) {
        dataNames.doctors.push(userAdd)
        res.json(userAdd)
    }
}

export const updateDoctor = (req: Request, res: Response) => {
    const gameUpdate = req.body
    const { id } = req.params
    const myID = parseInt(id)
    gameUpdate.id = parseInt(id)

    let index = dataNames.doctors.findIndex((item) => item.id === myID)
    console.log(id, index)

    if (index == undefined || index <= -1) {
        res.send('Provided patient ID is occupied!')
    } else {
        console.log(dataNames.doctors[index])
        dataNames.doctors[index] = gameUpdate
        res.json(gameUpdate)

        console.log(dataNames.doctors[index])
    }
}

export const deleteDoctor = (req: Request, res: Response) => {
    const { id } = req.params
    const deleted = dataNames.doctors.find(
        (user) => user.id.toString() === id,
    )

    if (deleted) {
        dataNames.doctors = dataNames.doctors.filter(
            (user) => user.id.toString() !== id,
        )
        res.json(deleted)
    } else {
        res.send('Provided patient id is invalid!')
    }
}
