import * as Yup from 'yup';
import Rent from '../models/Rent';

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

    const { userId } = req;

    const bodyRent = {
      userId,
      rented_at: Date.now(),
      returned_at: null,
      ...req.body,
    };

    console.log(bodyRent);

    const response = await Rent.create(bodyRent);

    console.log(response);

    return res.json(response);
  }
}

export default new RentController();
