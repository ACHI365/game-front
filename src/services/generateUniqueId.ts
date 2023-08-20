import { v4 as uuidv4 } from "uuid";

export default function generateUniqueId(username: string): string {
  const uuid = uuidv4();
  const uniqueId = `${username}_${uuid}`;
  return uniqueId;
}
