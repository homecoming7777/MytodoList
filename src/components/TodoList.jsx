import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <ul className="mt-6 space-y-3">
      {props.filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleted={props.toggleCompleted}
          startEdit={props.startEdit}
          deleteTodo={props.deleteTodo}
          editingId={props.editingId}
          editText={props.editText}
          setEditText={props.setEditText}
          editDate={props.editDate}
          setEditDate={props.setEditDate}
          editTime={props.editTime}
          setEditTime={props.setEditTime}
          saveEdit={props.saveEdit}
        />
      ))}
    </ul>
  );
}
