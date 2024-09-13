import { getUserByEmail, createUser } from '../mongodb/models/user.js';
import { generateAuthToken } from '../helpers/index.js';

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, name } = req.body;

    if (!email || !name) {
      return res.sendStatus(400);
    }

    const userExists = await getUserByEmail(email);

    if (userExists) {
      return res.status(409).send('Email already exists');
    }


    const newUser = await createUser({
      email: email,
      name: name,
    });

    const token = await generateAuthToken(newUser._id);
    console.log(token);
    return res.status(200).json({ newUser, token }).end();

  } catch (e) {
    console.log(e);
    res.status(500).send('Server error');
  }
};