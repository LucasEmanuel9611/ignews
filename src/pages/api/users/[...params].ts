import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {

    const params = req.query

    console.log(params)

    const users = [
        {id: 1, name: 'Lucas'},
        {id: 2, name: 'Diego'},
        {id: 3, name: 'Rafa'},
    ]

    return res.json(users)
}