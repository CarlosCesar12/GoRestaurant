import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Modal } from "../Modal";
import { Input } from "../Input";

import { Form } from "./styles";
import { useFoods } from "../../hooks/useFoods";
import { FoodInterface } from "../../@types/FoodInterface";
import { SubmitHandler } from "@unform/core";

type ModalEditFoodProps = {
  setOpen: boolean;
  isClose: () => void;
};

export function ModalEditFood({ setOpen, isClose }: ModalEditFoodProps) {
  const { editFood, editingFoodData } = useFoods();
  const formRef = useRef(null);

  const handleSubmit: SubmitHandler<FoodInterface> = async (dataForm) => {
    const data = {
      id: editingFoodData.id,
      available: editingFoodData.available,
      image: dataForm.image,
      name: dataForm.name,
      description: dataForm.description,
      price: dataForm.price,
    };

    await editFood(data);
    isClose();
  };

  return (
    <Modal setOpen={setOpen} setClose={isClose}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFoodData}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
