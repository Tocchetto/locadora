import * as Yup from 'yup';
import Rent from '../models/Rent';
import Movie from '../models/Movie';

class RentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      quantity: Yup.number()
        .min(1)
        .required(),
      id_movie: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id_movie } = req.body;

    const movie = await Movie.findByPk(id_movie);

    if (!(movie.quantity > 0)) {
      return res
        .status(400)
        .json({ error: 'There are no copies available for this movie' });
    }

    movie.quantity -= 1;
    await movie.update({ quantity: movie.quantity });

    const { userId } = req;

    const bodyRent = {
      id_user: userId,
      rented_at: Date.now(),
      returned_at: null,
      ...req.body,
    };

    const response = await Rent.create(bodyRent);

    return res.json(response);
  }
}

export default new RentController();
