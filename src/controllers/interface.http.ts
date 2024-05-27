import { Request, Response } from 'express';

abstract class HttpInterface {

    abstract get(req: Request, res: Response): Promise<any>;

    abstract post(req: Request, res: Response): Promise<any>;


}

export default HttpInterface;
