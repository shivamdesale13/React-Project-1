
import './App.css';
import Header from './MyComponents/Header';
import { Footer } from './MyComponents/Footer';
import { Todos } from './MyComponents/Todos';
import React, { useState , useEffect} from 'react';
import { Addtodo } from './MyComponents/Addtodo';
import { About } from './MyComponents/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }


  const onDelete = (todo)=>{
    console.log("i m ondelete of todo", todo);
   // let index = todos.indexOf(todo);
    //todos.splice(index,1);
      setTodos(todos.filter((e)=>{
        return e!==todo;

      }));
      localStorage.setItem("todos",JSON.stringify(todos)); 



  }

  const addtodo =(title,desc)=>{
    console.log("I am adding todo",title,desc)
    let sno;
    if(todos.length===0){
      sno = 0;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    
    const myTodo = {
      sno:sno,
      title:title,
      desc:desc,
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
   

    
    

  }




  const [todos, setTodos] = useState([initTodo]);
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
    
  }, [todos])
  return (
    <>
    <Router>
     <Header title="My Todos List" searchBar={false}/>
     <Switch>
     <Route exact path="/" render={()=>{
       return (
       <>
       <Addtodo addtodo={addtodo}/>
     <Todos todos={todos} onDelete={onDelete}/>
     </>)
     }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>  
        </Switch>
     
     <Footer/>
     </Router>
    </>
  );
}

export default App;
