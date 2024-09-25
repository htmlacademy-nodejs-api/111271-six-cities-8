import { RentType } from './rent-type.enum.js';
import { AmenityType } from './amenity-type.enum.js';

export type RentOffer = {
  title: string;
  description: string;
  postDate: string;
  city: string;
  previewUrl: string;
  imageUrls: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  type: RentType;
  roomCount: number;
  guestCount: number;
  price: number;
  amenities: AmenityType[];
  userId: number;
  latitude: number;
  longitude: number;
}
