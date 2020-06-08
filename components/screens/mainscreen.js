import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper'
import firebase from '../../fb'
import {FlatList} from 'react-native-gesture-handler'
import Todos from './Todo'

function Todo(){
	const [task,setTask]=useState('')
	const [describe,setDescribe]=useState('')
	const [tasks,setTasks]=useState([])
	const db = firebase.database().ref()

	useEffect(()=>{
		return db.on('value',(snapshot)=>{
			const list =[];

			snapshot.forEach(doc=>{
				console.log("doc",doc.val())
				list.push({
					doc
				});
				console.log("list",list)	
			});
			setTasks(list);

		});
		
	},[])

	function addTask(){
		db.push({
			title: task,
			description: describe,
			complete: false

		})
		setTask('')
		setDescribe('')
	}
	
	return (
		<>
		<Appbar>
			<Appbar.Content title={"Todo App"}/>
		</Appbar>
		<FlatList 
			style={{flex:1, width:'100%'}}
			data={tasks}
			keyExtractor={(item) => item.key}
			renderItem={({item}) => <Todos {...item} /> }
		/>
		<TextInput label={"New Task"} value={task} onChangeText={setTask}/>
		<TextInput label={"describe"} value={describe} onChangeText={setDescribe}/>
		<Button onPress={()=>{addTask()}}>Add Task</Button>
		</>
	)
}

export default Todo;

