import {
  Availability,
  getAllAvailability,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../repositories/availabilityRepository.js";

export async function findAllAvailability(): Promise<Availability[]> {
  return getAllAvailability();
}

export async function findAvailabilityById(
  availability_id: number
): Promise<Availability | null> {
  return getAvailabilityById(availability_id);
}

export async function addAvailability(
  availability: Omit<Availability, "availability_id">
): Promise<Availability> {
  return createAvailability(availability);
}

export async function modifyAvailability(
  availability_id: number,
  availability: Partial<Omit<Availability, "availability_id">>
): Promise<Availability | null> {
  return updateAvailability(availability_id, availability);
}

export async function removeAvailability(
  availability_id: number
): Promise<boolean> {
  return deleteAvailability(availability_id);
}
