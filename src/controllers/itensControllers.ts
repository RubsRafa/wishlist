import { Request, Response, NextFunction } from "express";
import itensServices from "../services/itensServices.js";
import httpStatus from "http-status";
import { AddItemType, IdType, ItensFormat } from "../protocols/itensProtocols.js";

async function listAllItens(req: Request, res: Response, next: NextFunction) {
    try {
        const allItens: ItensFormat[] = await itensServices.listAllItens();
        return res.status(httpStatus.OK).send(allItens)
        
    } catch (err) {
        next(err);
    }
}

async function postItem(req: Request, res: Response, next: NextFunction) {
    const { name, genre, platform, status } = req.body as AddItemType;
 
    try {
        const itemAdded: ItensFormat = await itensServices.postItem({ name, genre, platform, status });
        return res.status(httpStatus.OK).send(itemAdded);
        
    } catch (err) {
        next(err);
    }
}

async function updateItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as IdType;
    const { status } = req.body as AddItemType;

    try {

        const itemUpdated: ItensFormat = await itensServices.updateItem({ id, status });
        return res.status(httpStatus.OK).send(itemUpdated);
        
    } catch (err) {
        next(err)
    }
}

async function deleteItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as IdType;
    
    try {
        console.log('controller')
        await itensServices.deleteItem({ id });
        return res.sendStatus(httpStatus.OK)
        
    } catch (err) {
       next(err) 
    }
}


export default {
    listAllItens,
    postItem,
    updateItem,
    deleteItem
}