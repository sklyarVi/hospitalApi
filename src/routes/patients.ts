import express, {Request, Response} from "express";

import dataNames from 'src/data/patients.json';

export const readPatients = (req: Request, res: Response) => {
    res.json(dataNames.patients);
}

export const readPatient = (req: Request, res: Response) => {
    let found = false
    dataNames.patients.forEach((element) => {
        if (element.id.toString() === req.params.id) {
            res.json(element)
            found = true
        }
    })

    if (!found) {
        res.send('Provided patient id is invalid!')
    }
}

export const addPatient = (req: Request, res: Response) => {
    const userAdd = req.body
    let filtres = dataNames.patients.filter((user) => user.id == userAdd.id)

    if (filtres.length == 1) {
        console.log('xD')
        res.send('Provided patient ID is occupied!')
    } else if (filtres.length == 0) {
        dataNames.patients.push(userAdd)
        res.json(userAdd)
    }
}

export const updatePatient = (req: Request, res: Response) => {
    const gameUpdate = req.body
    const { id } = req.params
    const myID = parseInt(id)
    gameUpdate.id = parseInt(id)

    let index = dataNames.patients.findIndex((item) => item.id === myID)
    console.log(id, index)

    if (index == undefined || index <= -1) {
        res.send('Provided patient ID is occupied!')
    } else {
        console.log(dataNames.patients[index])
        dataNames.patients[index] = gameUpdate
        res.json(gameUpdate)

        console.log(dataNames.patients[index])
    }
}

export const deletePatient = (req: Request, res: Response) => {
    const { id } = req.params
    const deleted = dataNames.patients.find(
        (user) => user.id.toString() === id,
    )

    if (deleted) {
        dataNames.patients = dataNames.patients.filter(
            (user) => user.id.toString() !== id,
        )
        res.json(deleted)
    } else {
        res.send('Provided patient id is invalid!')
    }
}
