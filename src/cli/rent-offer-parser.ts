import { AmenityType, RentOffer, RentType } from '../shared/types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getRandomPastDate } from '../shared/helpers/index.js';

export const parseRentOffer = (row: string): RentOffer => {
  const [
    title,
    description,
    createdDate,
    city,
    previewUrl,
    imageUrlsRaw,
    isPremium,
    isFavourite,
    rating,
    type,
    roomCount,
    guestCount,
    price,
    amenities,
    userId,
    latitude,
    longitude,
  ] = row.split('\t');

  return {
    title,
    description,
    postDate: createdDate,
    city,
    previewUrl,
    imageUrls: imageUrlsRaw.split(';'),
    isPremium: !!Number(isPremium),
    isFavourite: !!Number(isFavourite),
    rating: parseFloat(rating),
    type: type as RentType,
    roomCount: parseInt(roomCount, 10),
    guestCount: parseInt(guestCount, 10),
    price: parseFloat(price),
    amenities: amenities.split(';') as AmenityType[],
    userId: parseInt(userId, 10),
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
};

export type OfferMeta = {
  titles: string[];
  descriptions: string[];
  cities: string[];
  types: RentType[];
  amenities: AmenityType[];
  offerImages: string[];
};

export const generateTsvOffer = (meta: OfferMeta): string => {
  const title = getRandomItem(meta.titles);
  const description = getRandomItem(meta.descriptions);
  const postDate = getRandomPastDate();
  const city = getRandomItem(meta.cities);
  const previewUrl = getRandomItem(meta.offerImages);
  const imageUrls = getRandomItems(meta.offerImages).join(';');
  const isPremium = getRandomItem(['0', '1']);
  const isFavourite = getRandomItem(['0', '1']);
  const rating = generateRandomValue(1, 5, 2);
  const roomCount = generateRandomValue(1, 5);
  const guestCount = generateRandomValue(1, 5);
  const price = generateRandomValue(1, 5, 2);
  const type = getRandomItem(meta.types);
  const amenities = getRandomItems(meta.amenities).join(';');
  const userId = generateRandomValue(1, 10);
  const latitude = generateRandomValue(1, 90, 5);
  const longitude = generateRandomValue(1, 180, 5);

  return [
    title,
    description,
    postDate,
    city,
    previewUrl,
    imageUrls,
    isPremium,
    isFavourite,
    rating,
    roomCount,
    guestCount,
    price,
    type,
    amenities,
    userId,
    latitude,
    longitude,
  ].join('\t');
};
