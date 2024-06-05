const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.body.email } });
  const hashedPassword = await argon2.hash(req.body.password)
  if (user === null || await argon2.verify(hashedPassword, req.body.password) === false)
    // Login failed.
    res.status(401).json({ message: "Invalid login credentials", status: 401 });
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

    const user = await db.user.create({
      email: req.body.email,
      password: hash,
      fullName: req.body.fullName
    });

    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(807).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.edit = async (req, res) => {

  const user = await db.user.findByPk(req.body.id);
  
  let params = {
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName
  }

  try {
    if(user) {
      await user.update(params)
    }

  }
  catch(error) {
    console.error("Error updating user: ", error)
    res.send(error)

  }

  res.json({message: "User updated successfully", status:200})
}

exports.delete = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if(user) await user.destroy()

    res.send({message: "User deleted successfully", status: 200})
  }
  catch(e) {
    console.log(e)
    res.send(e)
  }
}
