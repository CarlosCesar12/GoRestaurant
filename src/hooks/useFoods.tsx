import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { FoodInterface } from "../@types/FoodInterface";
import api from "../services/api";

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

type FoodProviderProps = {
  children: ReactNode;
};

interface FoodContextData {
  foods: FoodInterface[];
  createFood: (data: FoodInterface) => Promise<void>;
  deleteFood: (id: number) => void;
  handleAvailable: (id: number) => void;
  editFood: (data: FoodInterface) => Promise<void>;
  editingFoodData: FoodInterface;
  getDataFoodEdit: (id: number) => void;
}

export function FoodProvider({ children }: FoodProviderProps) {
  const [foods, setFoods] = useState<FoodInterface[]>([]);
  const [editingFoodData, setEditingFoodData] = useState<FoodInterface>(
    {} as FoodInterface
  );

  useEffect(() => {
    api.get("foods").then((response) => setFoods(response.data));
  }, []);

  async function createFood(data: FoodInterface) {
    const newFood = await api.post("/foods", data);
    const food = newFood.data;

    setFoods([...foods, food]);
  }

  function deleteFood(id: number) {
    const newFoods = foods.filter((food) => {
      food.id === id && api.delete(`/foods/${id}`);
      return food.id !== id;
    });
    setFoods(newFoods);
  }

  async function handleAvailable(id: number) {
    const selectFoodAvailable = foods.filter((food) => {
      return food.id === id;
    });

    const foodAvailable = {
      id: selectFoodAvailable[0].id,
      name: selectFoodAvailable[0].name,
      description: selectFoodAvailable[0].description,
      price: selectFoodAvailable[0].price,
      available: !selectFoodAvailable[0].available,
      image: selectFoodAvailable[0].image,
    };

    await api.put(`/foods/${id}`, foodAvailable);
    await api.get("/foods").then((response) => setFoods(response.data));
  }

  async function editFood(data: FoodInterface) {
    await api.put(`/foods/${data.id}`, data);
    await api.get("/foods").then((response) => setFoods(response.data));
  }

  function getDataFoodEdit(id: number) {
    const dataFoodEdit = foods.filter((food) => {
      return food.id === id;
    });
    const dataFood = {
      id: dataFoodEdit[0].id,
      available: dataFoodEdit[0].available,
      price: dataFoodEdit[0].price,
      name: dataFoodEdit[0].name,
      description: dataFoodEdit[0].description,
      image: dataFoodEdit[0].image,
    };
    setEditingFoodData(dataFood);
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        createFood,
        deleteFood,
        handleAvailable,
        editFood,
        editingFoodData,
        getDataFoodEdit,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodContext);

  return context;
}
