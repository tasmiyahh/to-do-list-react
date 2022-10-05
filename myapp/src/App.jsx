import axios from "axios"
import { useState, useEffect } from "react"
import Todolist from "./component/todo/index"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import "./App.css"



const App = () => {

    const [data, setData] = useState([]);
    const [all, setall] = useState([])
    useEffect(() => {

        axios.get('https://brainy-cyan-leggings.cyclic.app/users')

            .then(function (response) {
                console.log(response.data);
                setall(response.data)


            })
            .catch(function (error) {
                console.log(error.response.data);

            });

    }, [data])

    let submitHandler = (e) => {

     e.preventDefault()



        axios.post('https://brainy-cyan-leggings.cyclic.app/', {
            text: data
        })
            .then(function (response) {
                console.log(response.data.message);
                setData(response.data.todo)



            })
            .catch(function (error) {
                console.log(error);
            })

    }




    return (
        <>
            <div className='todo'>
                <h1>TODO LIST</h1>





                {/* { <input type="text" onChange={(e) => {
                    console.log(e.target.value);
                    setData(e.target.value)

                }}

              required id='todo' placeholder="enter your todolist" />
              <button type='submit' >Add</button>
             <input type="reset" value="Reset" />
      } */}
                
                <Form onSubmit={submitHandler}>
                    <InputGroup className="mb-3">
                       
                        <Form.Control 
                            placeholder="what you have planned?"
                            id="todo"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setData(e.target.value)

                            }}

                        />
                        <Button type="submit" id="button-addon2"  >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>

                        <Button type="reset" id="reset"><FontAwesomeIcon icon={faRotateRight} /></Button>


                      
                    </InputGroup>

                
                </Form>
            




                 
                 {
                    all.map((eachItem, index) => {
                        return (
                            <Todolist

                                text={eachItem.text}
                                key={index}



                            />)
                    })
                }
                


















            </div>

        </>
    )


}

export default App;