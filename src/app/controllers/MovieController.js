import * as Yup from 'yup';
import Movie from '../models/Movie';

class MovieController {
  async index(req, res) {
    const movies = await Movie.findAll();

    return res.json(movies);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      director: Yup.string().required(),
      quantity: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id, title, director, quantity } = await Movie.create(req.body);

    return res.status(200).json({
      id,
      title,
      director,
      quantity,
    });
  }

  async show(req, res) {
    const movies = await Movie.findAll({ where: { title: req.query.title } });

    if (!movies) {
      return res
        .status(400)
        .json({ error: `The movie "${req.query.title}" does not exists.` });
    }

    return res.status(200).json(movies);
  }
}

export default new MovieController();
