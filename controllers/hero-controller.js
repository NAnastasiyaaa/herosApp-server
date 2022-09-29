const Hero = require("../model/Hero");

const getAllHeros = async (req, res, next) => {
  let heros;
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");
  const total = await Hero.countDocuments({});

  try {
    heros = await Hero.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
  } catch (err) {
    console.log(err);
  }
  if (!heros) {
    return res.status(404).json({ message: "No heros found..." });
  }
  return res.status(200).json({ totalPages: Math.ceil(total / PAGE_SIZE), heros });
};

exports.getAllHeros = getAllHeros;

const getById = async (req, res, next) => {
  const id = req.params.id;
  let hero;
  try {
    hero = await Hero.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!hero) {
    return res.status(404).json({ message: "No hero found..." });
  }
  return res.status(200).json({ hero });
};

exports.getById = getById;

const addHero = async (req, res, next) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    image,
  } = req.body;
  let hero;
  try {
    hero = new Hero({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      image,
    });

    await hero.save();
  } catch (err) {
    console.log(err);
  }
  if (!hero) {
    return res.status(404).json({ message: "No hero found..." });
  }
  return res.status(201).json({ hero });
};

exports.addHero = addHero;

const updateHero = async (req, res, next) => {
  const id = req.params.id;
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    image,
  } = req.body;
  let hero;
  try {
    hero = await Hero.findByIdAndUpdate(id, {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      image,
    });
    hero = await hero.save();
  } catch (err) {
    console.log(err);
  }
  if (!hero) {
    return res.status(404).json({ message: "No updated..." });
  }
  return res.status(200).json({ hero });
};

exports.updateHero = updateHero;

const deleteHero = async (req, res, next) => {
  const id = req.params.id;
  let hero;
  try {
    hero = await Hero.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!hero) {
    return res.status(404).json({ message: "No deleted..." });
  }
  return res.status(200).json({ message: "Hero successfully deleted " });
};

exports.deleteHero = deleteHero;
