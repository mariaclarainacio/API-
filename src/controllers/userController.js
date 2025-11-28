const User = require("../models/User");

module.exports = {
  async findAll(req, res) {
    const users = await User.findAll();
    res.status(200).json(users);
  },

  async findById(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json(user);
  },

  async update(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const updated = await user.update(req.body);
    res.status(200).json(updated);
  },

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    await user.destroy();
    res.status(204).send();
  }
};