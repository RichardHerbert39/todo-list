import React, { Component } from "react";
import * as mockApi from "./api";
import { Subscription } from "rxjs";
import styles from "./TodoList.module.css"

let callEndpointInterval: NodeJS.Timeout;
let todoListSubscription: Subscription;
let tempSubscriptionRef: Subscription;

class TodoList extends Component {
  state = {
    todoListItems: [{
      id: 0,
      message: "message",
      isDone: false
    }],
    dataFetched: false
  }

  render() {
    const {todoListItems, dataFetched} = this.state;
    return <>
      <h1>Todo list</h1>
      {
        dataFetched ? 
          <>
            {todoListItems.length > 0 ? <>
              {todoListItems.map(item => <div key={item.id} className={styles.todo}>
                <input className={styles.checkbox} onClick={() => this.handleCheckboxClick(item)}
                  type="checkbox"
                  defaultChecked={item.isDone}></input>
                {item.message}
                <span className={styles.delete} onClick={() => this.handleDeleteTodo(item.id)}>delete</span>
              </div>)}
            </> : 
            <p><em>No todos.</em></p>
            }
            <p>
              <span className={styles.addTodo} onClick={() => this.handleAddTodo()}>+ Add todo</span>
            </p>
          </> : 
          <p className={styles.loading}>Loading...</p>
      }
    </>;
  }

  componentDidMount() {
    this.getTodos();
    callEndpointInterval = setInterval(() => {
      this.getTodos();
    }, 5000);
  }

  componentWillUnmount() {
    if (callEndpointInterval) {
      clearInterval(callEndpointInterval);
    }
    if (todoListSubscription) {
      todoListSubscription.unsubscribe();
    }
    if (tempSubscriptionRef) {
      tempSubscriptionRef.unsubscribe();
    }
  }

  handleCheckboxClick(item: { id: number; message: string; isDone: boolean; }) {
      const newItem = {
        id: item.id,
        message: item.message,
        isDone: !item.isDone
      }
      tempSubscriptionRef = mockApi.updateTodo(newItem).subscribe();
  }

  handleDeleteTodo(id: number) {
    let todos = this.state.todoListItems;
    const index = todos.findIndex(todo => todo.id === id);
    if (index >= 0) {
      todos.splice(index, 1);
    }
    this.setState({
      todoListItems: todos
    });
    tempSubscriptionRef = mockApi.deleteTodo(id).subscribe();
  }

  handleAddTodo() {
    const message = prompt("Enter new todo");
    if (message !== null) {
      let todos = this.state.todoListItems;
      const todoIds = this.state.todoListItems.map(item => item.id)
      const id = Math.max(0, ...todoIds) + 1;
      todos.push({
        id,
        message,
        isDone: false
      });
      this.setState({
        todoListItems: todos
      });
      tempSubscriptionRef = mockApi.addTodo(message).subscribe();
    }
  }

  getTodos() {
    let result = mockApi.getTodoList()
    todoListSubscription = result.subscribe((data) => {
      this.setState({
        todoListItems: data,
        dataFetched: true
      });
    });
  }
}

export default TodoList;