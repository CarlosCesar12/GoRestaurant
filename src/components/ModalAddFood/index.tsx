import { FiCheckSquare } from "react-icons/fi";

import { FoodInterface } from "../../@types/FoodInterface";

import { Modal } from "../Modal";
import { Input } from "../Input";
import { useRef } from "react";
import { SubmitHandler } from "@unform/core";

import { Form } from "./styles";
import { useFoods } from "../../hooks/useFoods";

type ModalAddFoodProps = {
  setOpen: boolean;
  isClose: () => void;
};

type DataProps = Omit<FoodInterface, "id" | "available">;

export function ModalAddFood({ setOpen, isClose }: ModalAddFoodProps) {
  const { createFood } = useFoods();

  const formRef = useRef(null);

  const handleSubmit: SubmitHandler<DataProps> = async (dataForm) => {
    const data = {
      id: Math.floor(Math.random() * 100),
      available: false,
      image: dataForm.image,
      name: dataForm.name,
      description: dataForm.description,
      price: dataForm.price,
    };

    await createFood(data);

    isClose();
  };

  return (
    <Modal setOpen={setOpen} setClose={isClose}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
