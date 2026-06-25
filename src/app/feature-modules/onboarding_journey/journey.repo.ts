import { OnboardingJourneys } from "./journey.schema.js";
import type { OnboardingJourney } from "./journey.types.js";

const add = (journey: Omit<OnboardingJourney, "id">) =>
  OnboardingJourneys.create(journey);

const findById = (id: string) =>
  OnboardingJourneys.findOne({ where: { id } });

const findByNewHireId = (newHireId: string) =>
  OnboardingJourneys.findOne({ where: { newHireId } });

const findAll = () => OnboardingJourneys.findAll();

const update = (id: string, data: Omit<Partial<OnboardingJourney>, "id">) =>
  OnboardingJourneys.update(data as any, { where: { id } });

const remove = (id: string) =>
  OnboardingJourneys.destroy({ where: { id } });

export default {
  add,
  findById,
  findByNewHireId,
  findAll,
  update,
  remove,
};
