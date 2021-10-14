import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
interface ICard {
  title: string;
  idForm: string;
  idInput: string;
  task: { titleTask: string; id: string }[];
}
type TTypes = {
  cards: any;
  source: any;
  destination: any;
};

export const slice = createSlice({
  name: "card",
  initialState: {
    cards: [
      {
        title: "12",
        idForm: "44",
        idInput: "66",
        task: [
          { titleTask: "77", id: "9" },
          { titleTask: "123", id: "1119" },
        ],
      },
    ],
  },
  reducers: {
    // Логика Drag and Drop :3
    // changeInsideTaskPosition - Логика отвечающая за смену таска в пределах одной карточки.
    changeInsideTaskPosition: (state, action: PayloadAction<TTypes>) => {
      const actionPayload = action.payload;
      const card = actionPayload.cards.find(
        (item: any) => item.idForm === actionPayload.source.droppableId
      );

      const copiedItems = [...card.task];
      const [removed] = copiedItems.splice(actionPayload.source.index, 1);
      copiedItems.splice(actionPayload.destination.index, 0, removed);
      const mappedCards = actionPayload.cards.map((item: ICard) => {
        if (item.idForm === actionPayload.source.droppableId) {
          return {
            ...item,
            task: copiedItems,
          };
        }
        return item;
      });
      return void (state.cards = mappedCards);
    },
    // changeOutsideTaskPosition - Логика отвечающая за перекидывание таска во всех карточках.
    changeOutsideTaskPosition: (state, action) => {
      console.log("hi");
      const actionPayload = action.payload;

      const sourceCard = actionPayload.cards.find(
        (item: any) => item.idForm === actionPayload.source.droppableId
      );
      const destCard = actionPayload.cards.find(
        (item: any) => item.idForm === actionPayload.destination.droppableId
      );

      const sourceTask = [...sourceCard.task];
      const destTask = [...destCard.task];

      const [removed] = sourceTask.splice(actionPayload.source.index, 1);
      const a = {
        ...actionPayload.cards,
        [actionPayload.source]: {
          ...sourceCard,
          task: sourceTask,
        },
        [actionPayload.destination]: {
          ...destCard,
          task: destTask,
        },
      };
      console.log("is a", a);

      /* if ([removed] === sourceTask.splice(actionPayload.source.index, 1)) {
        sourceTask.pop(actionPayload.source.index, 1)
      } */
      destTask.splice(actionPayload.destination.index, 0, removed);

      console.log("sourceCard", sourceCard);
      console.log("removed", [removed]);
      console.log("destTask", destTask);

      const changeTasks = actionPayload.cards.map((item: any) => {
        console.log(item);

        /* destTask.find(
          (item: any) => item.task === actionPayload.destination.task
          
        ) */
      });

      /* const sourceCard = cards.find(
        (item: any) => item.idForm === source.droppableId
      );
      const destCard = cards.find(
        (item: any) => item.idForm === destination.droppableId
      );
      const sourceTask = [...sourceCard.task];
      const destTask = [...destCard.task];
      const [removed] = sourceTask.splice(source.index, 1);
      destTask.splice(destination.index, 0, removed);

      const changeTasks = cards.map((item: any) => {
        destTask.find((item: any) => item.task === destination.task);

        return item;
      });
      changeTasks(); */
    },

    //Логика создания карточки
    createCards: (state, action) => {
      let actionPayload = action.payload;

      let id = uuidv4();
      let createCard = [
        ...actionPayload.cards,
        {
          title: actionPayload.cardTitle,
          idForm: id,
          idInput: id,
          task: [],
        },
      ];
      return void (state.cards = createCard);
    },

    // сreateTaskInsideCard - Логика отвечающая за создание таска в карточке.
    сreateTaskInsideCard: (state, action) => {
      const actionPayload = action.payload;
      let id = uuidv4();
      const mappedCards = actionPayload.cards.map((item: ICard) => {
        if (item.idForm === actionPayload.id) {
          return {
            ...item,
            task: [
              ...item.task,
              { titleTask: actionPayload.titleTaskInput, id },
            ],
          };
        }
        return item;
      });
      return void (state.cards = mappedCards);
    },
  },
});
export const {
  createCards,
  сreateTaskInsideCard,
  changeInsideTaskPosition,
  changeOutsideTaskPosition,
} = slice.actions;

export const cardSelector = (state: any) => state.board.cards;
export default slice.reducer;
