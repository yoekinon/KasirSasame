import Menu from "../models/MenuModel.js";

export const getMenus = async (req, res) => {
  try {
    const response = await Menu.findAll();
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

export const getMenuById = async (req, res) => {
  try {
    const response = await Menu.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

export const createMenu = async (req, res) => {
  try {
    await Menu.create(req.body);
    res.status(201).json({ mgs: "Menu Created" });
  } catch (err) {
    console.log(err.message);
  }
};

export const updateMenu = async (req, res) => {
  try {
    await Menu.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ mgs: "Menu Updated" });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteMenu = async (req, res) => {
  try {
    await Menu.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ mgs: "Menu Deleted" });
  } catch (err) {
    console.log(err.message);
  }
};
//12.19
