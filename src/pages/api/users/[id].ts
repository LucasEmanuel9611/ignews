import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {

    const id = req.query.id

    console.log(id)

    const users = [
        {id: 1, name: 'Lucas'},
        {id: 2, name: 'Diego'},
        {id: 3, name: 'Rafa'},
    ]

    return res.json(users)
}