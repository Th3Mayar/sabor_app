import {
  saveUserColumnOrder,
  getUserColumnOrder,
} from "../repositories/columnOrderRepository.js";

export async function saveUserColumnOrderService(
  user_id: number,
  columns: any[]
): Promise<void> {
  try {
    await saveUserColumnOrder(user_id, columns);
  } catch (error) {
    console.error("Error saving column order:", error);
    throw new Error("Failed to save column order");
  }
}

export async function getUserColumnOrderService(
  user_id: number
): Promise<any[]> {
  try {
    const columnOrder = await getUserColumnOrder(user_id);
    if (!columnOrder) {
      throw new Error("Column order not found");
    }
    return columnOrder;
  } catch (error) {
    console.error("Error getting column order:", error);
    throw new Error("Failed to load column order");
  }
}
