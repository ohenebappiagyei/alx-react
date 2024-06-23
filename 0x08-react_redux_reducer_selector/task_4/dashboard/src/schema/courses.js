import { schema, normalize } from "normalizr";

// Define the course schema
const courseSchema = new schema.Entity("courses");

// Function to normalize courses data
export function coursesNormalizer(data) {
  return normalize(data, [courseSchema]);
}
