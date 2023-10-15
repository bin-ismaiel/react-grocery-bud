import ListItem from "./ListItem";
export default function List({ items, removeItem, toogleItem }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <ListItem
            key={item.id}
            {...item}
            removeItem={removeItem}
            toogleItem={toogleItem}
          />
        );
      })}
    </ul>
  );
}
