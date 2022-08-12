import { useState } from "react";

import { useFoods } from "../../hooks/useFoods";

import { Header } from "../../components/Header";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";

export function Dashboard() {
  const { foods, getDataFoodEdit } = useFoods();

  const [modalCreateFood, setModalCreateFood] = useState(false);
  const [modalEditFood, setModalEditFood] = useState(false);

  function ChangeModalCreateFoodOpen() {
    setModalCreateFood(true);
  }

  function ChangeModalCreateFoodClose() {
    setModalCreateFood(false);
  }

  function ChangeModalEditFoodOpen(id: number) {
    setModalEditFood(true);
    getDataFoodEdit(id);
  }

  function ChangeModalEditFoodClose() {
    setModalEditFood(false);
  }

  return (
    <>
      <Header openModal={ChangeModalCreateFoodOpen} />

      {modalCreateFood && (
        <ModalAddFood
          setOpen={modalCreateFood}
          isClose={ChangeModalCreateFoodClose}
        />
      )}

      {modalEditFood && (
        <ModalEditFood
          setOpen={modalEditFood}
          isClose={ChangeModalEditFoodClose}
          //editingFood={editingFood}
          //handleUpdateFood={this.handleUpdateFood}
        />
      )}

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              setEditingFood={ChangeModalEditFoodOpen}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
