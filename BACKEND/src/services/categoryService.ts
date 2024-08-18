import * as categoryRepository from '../repositories/categoryRepository.js';

export const getAllCategories = async () => {
  return await categoryRepository.getAllCategories();
};

export const createCategory = async (name: string) => {
  return await categoryRepository.createCategory(name);
};

export const getCategoryById = async (id: number) => {
  return await categoryRepository.getCategoryById(id);
};

export const updateCategory = async (id: number, name: string) => {
  return await categoryRepository.updateCategory(id, name);
};

export const deleteCategory = async (id: number) => {
  return await categoryRepository.deleteCategory(id);
};