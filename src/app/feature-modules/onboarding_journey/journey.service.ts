import journeyRepo from "./journey.repo.js";
import { OnboardingJourneyResponse } from "./journey.response.js";
import type { OnboardingJourney } from "./journey.types.js";


const create = async (id: string ,createdBy: string,) => {
  try {
    const existing = await journeyRepo.findByNewHireId(id);
    if (existing) throw OnboardingJourneyResponse.JOURNEY_ALREADY_EXISTS;

    await journeyRepo.add({
      newHireId: id,
      startDate: new Date(),
      status: "Pending",
      completedAt: null,
      createdBy,
      updatedBy: createdBy,
    });

    return OnboardingJourneyResponse.JOURNEY_CREATED;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

const findById = async (id: string) => {
  try {
    const journey = await journeyRepo.findById(id);
    if (!journey) throw OnboardingJourneyResponse.JOURNEY_NOT_FOUND;
    return journey;
  } catch (error) {
    throw error;
  }
};

const findByNewHireId = async (newHireId: string) => {
  try {
    const journey = await journeyRepo.findByNewHireId(newHireId);
    if (!journey) throw OnboardingJourneyResponse.JOURNEY_NOT_FOUND;
    return journey;
  } catch (error) {
    throw error;
  }
};

const findAll = () => journeyRepo.findAll();

const update = async (
  id: string,
  data: Omit<Partial<OnboardingJourney>, "id">,
  updatedBy: string,
) => {
  try {
    const journey = await journeyRepo.findById(id);
    if (!journey) throw OnboardingJourneyResponse.JOURNEY_NOT_FOUND;

    await journeyRepo.update(id, { ...data, updatedBy });
    return OnboardingJourneyResponse.JOURNEY_UPDATED;
  } catch (error) {
    throw error;
  }
};

const markCompleted = async (id: string, updatedBy: string) => {
  try {
    const journey = await journeyRepo.findById(id);
    if (!journey) throw OnboardingJourneyResponse.JOURNEY_NOT_FOUND;

    await journeyRepo.update(id, {
      status: "Completed",
      completedAt: new Date(),
      updatedBy,
    });

    return OnboardingJourneyResponse.JOURNEY_COMPLETED;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: string) => {
  try {
    const journey = await journeyRepo.findById(id);
    if (!journey) throw OnboardingJourneyResponse.JOURNEY_NOT_FOUND;

    await journeyRepo.remove(id);
    return { statusCode: 200, message: "Onboarding journey deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  findById,
  findByNewHireId,
  findAll,
  update,
  markCompleted,
  remove,
};
