import express, { Request, Response, NextFunction, Router } from "express";

import { getUser, getAllUsers, deleteUser, createUser } from "../db/usersDb";

import bcrypt from "bcrypt";

const router: Router = express.Router({ mergeParams: true });

router.get("/getUsers", async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();

    if (users.count === 0) {
        res.status(404).json({ error: "No users found" });
        return next();
    }

    res.status(200).json({
        usernames: users
    })
    
    return next();
});

router.get("/authUser", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: "No credentials"});
        return next();
    }
    const [username, password] = atob(req.headers.authorization.split(" ")[1]).split(":");
    const user = await getUser(username);
    console.log(user.state);
    if (user.count === 0) {
        res.status(401).json({ error: "No user found" });
        return next();
    }
    const compare = await bcrypt.compare(password, user[0].password);
    if (compare) {
        res.status(200).json({ ...user });
        return next();
    } else {
        res.status(401).json({ error: "Incorrect password" });
        return next();
    }
})

router.post("/createUser", async (req: Request, res: Response, next: NextFunction) => {
    const userObj: { username: string, password: string } = JSON.parse(req.body);

    const hash = await bcrypt.hash(userObj.password, 10);
    const user = await createUser(userObj.username, hash);

    if (user.count === 0) {
        
    }

});

router.put("/:username", async (req: Request, res: Response, next: NextFunction) => {

});

router.delete("/deleteUser/:username", async (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username;
    
    const delUser = await deleteUser(username);
    
    if (delUser.count === 0) {
        res.status(410).json({ error: "User doesn't exist" });
        return next();
    } else {
        res.status(200).json({ message: "User has been deleted" });
        return next();
    }
});

export default router;