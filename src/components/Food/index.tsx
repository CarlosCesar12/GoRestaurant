import { FiEdit3, FiTrash } from "react-icons/fi";

import { useFoods } from "../../hooks/useFoods";

import { Container } from "./styles";

interface FoodProps {
  food: {
    id: number;
    image: string;
    name: string;
    price: string;
    description: string;
    available: boolean;
  };
  setEditingFood: (id: number) => void;
}

export function Food({ food, setEditingFood }: FoodProps) {
  const { deleteFood, handleAvailable } = useFoods();

  function toggleAvailable(id: number) {
    handleAvailable(id);
  }

  function handleDelete(id: number) {
    deleteFood(id);
  }
  return (
    <Container>
      <div>
        <header className={food.available ? "headerTrue" : "headerFalse"}>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
      </div>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood(food.id)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={() => toggleAvailable(food.id)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
