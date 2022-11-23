import Hotel from "../models/Hotels.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const allHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 999},
    }).limit(req.query.limit);
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
    //res.status(500).json(e)
  }
};

//count by city
export const countByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//count by type
export const countByType = async (req, res, next) => {
  try {
    const hotelType = await Hotel.countDocuments({ type: "hotel" });
    const apartmentType = await Hotel.countDocuments({ type: "apartment" });
    const resortType = await Hotel.countDocuments({ type: "resort" });
    const villType = await Hotel.countDocuments({ type: "villa" });
    const cabinType = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelType },
      { type: "apartments", count: apartmentType },
      { type: "resort", count: resortType },
      { type: "villas", count: villType },
      { type: "cabins", count: cabinType },
    ]);
  } catch (err) {
    next(err);
  }
};
