import { AmenityType, RentOffer, RentType } from '../shared/types/index.js';

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
    postDate: new Date(createdDate),
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
